const path = require(`path`);
const kebabCase = require('lodash.kebabcase');

const Config = require('./config/siteConfig');
const ContentConfig = require('./config/contentConfig');
const { getSlug } = require(`./src/utils/i18n`);
const {
    getPageTranslations,
    getPostTranslations,
    getCategoryTranslations,
    getTagTranslations,
    getUrlLangPrefix,
    resolvePageUrl,
} = require('./src/utils/i18n');

exports.createSchemaCustomization = ({ actions, schema }) => {
    const { createTypes, createFieldExtension } = actions;

    createFieldExtension({
        name: `defaultFalse`,
        extend() {
            return {
                resolve(source, args, context, info) {
                    if (source[info.fieldName] == null) {
                        return false;
                    }
                    return source[info.fieldName];
                },
            };
        },
    });

    createFieldExtension({
        name: `uncategorized`,
        extend() {
            return {
                resolve(source, args, context, info) {
                    if (source[info.fieldName] == null) {
                        return 'uncategorized';
                    }
                    return source[info.fieldName];
                },
            };
        },
    });

    const typeDef = [
        `type Frontmatter @infer {
            featuredImage: File @fileByAbsolutePath(path: "src")
            featured: Boolean @defaultFalse
            category: String @uncategorized
        }`,
        `type Mdx implements Node @infer {
            frontmatter: Frontmatter
        }`,
    ];
    createTypes(typeDef);
};

exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions;

    return new Promise(resolve => {
        deletePage(page);

        Config.langs.all.map(lang => {
            const is404 = page.path === `/404.html`;
            const path = is404
                ? getUrlLangPrefix(lang, page.path)
                : getSlug(page.path, lang);

            return createPage({
                ...page,
                path,
                context: {
                    locale: lang,
                    translations: getPageTranslations(page.path, is404),
                },
            });
        });

        resolve();
    });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const PostItem = path.resolve('./src/views/templates/PostItem.js');
    // const ProductItem = path.resolve('./src/views/templates/ProductItem.js');

    const result = await graphql(`
        {
            posts: allMdx(
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 2000
            ) {
                edges {
                    node {
                        frontmatter {
                            lang
                            path
                            category
                            tags
                            featured
                        }
                        fileAbsolutePath
                    }
                }
            }
            tagsGroup: allMdx(limit: 2000) {
                group(field: frontmatter___tags) {
                    fieldValue
                    totalCount
                    edges {
                        node {
                            frontmatter {
                                title
                                lang
                                tags
                            }
                            fileAbsolutePath
                        }
                    }
                }
            }
            categoriesGroup: allMdx(limit: 2000) {
                group(field: frontmatter___category) {
                    fieldValue
                    totalCount
                    edges {
                        node {
                            fileAbsolutePath
                            frontmatter {
                                lang
                                category
                            }
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    const posts = result.data.posts.edges;

    // If post pagination
    if (ContentConfig.posts.pagination) {
        const PostListWithPagination = path.resolve(
            './src/views/templates/PostListWithPagination.js',
        );
        const postsPerPage = ContentConfig.posts.perPage;
        const postsWithoutFeatured = posts.filter(
            ({ node }) => !node.frontmatter.featured,
        );
        const numPages = Math.ceil(postsWithoutFeatured.length / postsPerPage);

        Array.from({ length: numPages }).forEach((_, i) => {
            Config.langs.all.map(lang => {
                const path =
                    i === 0
                        ? getUrlLangPrefix(lang, Config.articlePrefix)
                        : getUrlLangPrefix(
                              lang,
                              `${Config.articlePrefix}page/${i + 1}/`,
                          );
                createPage({
                    path,
                    component: PostListWithPagination,
                    context: {
                        limit: postsPerPage,
                        skip: i * postsPerPage,
                        currentPage: i + 1,
                        numPages,
                        locale: lang,
                        translations: getPageTranslations(path),
                    },
                });
            });
        });
    } else {
        // Return PostList.js
        const PostList = path.resolve('./src/views/templates/PostList.js');
        Config.langs.all.map(lang => {
            const path = getUrlLangPrefix(lang, Config.articlePrefix);
            createPage({
                path,
                component: PostList,
                context: {
                    locale: lang,
                    translations: getPageTranslations(path),
                },
            });
        });
    }

    // Create post detail pages
    posts.forEach(({ node }) => {
        // if (node.frontmatter.path.indexOf('/blog') !== 0) {
        //     throw new Error(`Invalid path prefix: ${node.frontmatter.path}`);
        // }
        const lang = node.frontmatter.lang;
        createPage({
            path: resolvePageUrl(getUrlLangPrefix(lang, node.frontmatter.path)),
            component: PostItem,
            context: {
                locale: lang,
                postPath: node.frontmatter.path,
                translations: getPostTranslations(posts, node),
            },
        });
    });

    const categories = result.data.categoriesGroup.group;

    // If category pagination
    if (ContentConfig.posts.pagination) {
        const CategoryItemWithPagination = path.resolve(
            './src/views/templates/CategoryItemWithPagination.js',
        );
        const postsPerPage = ContentConfig.posts.perPage;

        categories.forEach((cat, i) => {
            const numPages = Math.ceil(cat.totalCount / postsPerPage);
            cat.edges.forEach(({ node }) => {
                const { lang } = node.frontmatter;
                const link = getUrlLangPrefix(
                    lang,
                    `/category/${kebabCase(cat.fieldValue)}/`,
                );
                Array.from({ length: numPages }).forEach((_, i) => {
                    const path = i === 0 ? link : `${link}page/${i + 1}/`;
                    createPage({
                        path,
                        component: CategoryItemWithPagination,
                        context: {
                            limit: postsPerPage,
                            skip: i * postsPerPage,
                            currentPage: i + 1,
                            numPages,
                            locale: lang,
                            translations: getCategoryTranslations(posts, node),
                            category: cat.fieldValue,
                        },
                    });
                });
            });
        });
    } else {
        // Return PostList.js
        const CategoryItem = path.resolve(
            './src/views/templates/CategoryItem.js',
        );

        categories.forEach(cat => {
            cat.edges.forEach(({ node }) => {
                const lang = node.frontmatter.lang;
                const path = getUrlLangPrefix(
                    lang,
                    `/category/${kebabCase(cat.fieldValue)}/`,
                );

                createPage({
                    path,
                    component: CategoryItem,
                    context: {
                        categoty: cat.fieldValue,
                        locale: lang,
                        translations: getCategoryTranslations(posts, node),
                    },
                });
            });
        });
    }

    const tags = result.data.tagsGroup.group;

    // If tag pagination
    if (ContentConfig.posts.pagination) {
        const TagListWithPagination = path.resolve(
            './src/views/templates/TagItemWithPagination.js',
        );
        const postsPerPage = ContentConfig.posts.perPage;

        tags.forEach((tag, i) => {
            const numPages = Math.ceil(tag.totalCount / postsPerPage);
            tag.edges.forEach(({ node }) => {
                const { lang, tags: postTags } = node.frontmatter;
                const tagIndex = postTags.indexOf(tag.fieldValue);
                const link = getUrlLangPrefix(
                    lang,
                    `/tags/${kebabCase(tag.fieldValue)}/`,
                );
                Array.from({ length: numPages }).forEach((_, i) => {
                    const path = i === 0 ? link : `${link}page/${i + 1}/`;
                    createPage({
                        path,
                        component: TagListWithPagination,
                        context: {
                            limit: postsPerPage,
                            skip: i * postsPerPage,
                            currentPage: i + 1,
                            numPages,
                            locale: lang,
                            translations: getTagTranslations(
                                posts,
                                node,
                                tagIndex,
                            ),
                            tag: tag.fieldValue,
                        },
                    });
                });
            });
        });
    } else {
        // Return PostList.js
        const TagItem = path.resolve('./src/views/templates/TagItem.js');

        tags.forEach(tag => {
            tag.edges.forEach(({ node }) => {
                const lang = node.frontmatter.lang;
                const postTags = node.frontmatter.tags;
                const tagIndex = postTags.indexOf(tag.fieldValue);
                const path = getUrlLangPrefix(
                    lang,
                    `/tags/${kebabCase(tag.fieldValue)}/`,
                );

                createPage({
                    path,
                    component: TagItem,
                    context: {
                        tag: tag.fieldValue,
                        locale: lang,
                        translations: getTagTranslations(posts, node, tagIndex),
                    },
                });
            });
        });
    }
};

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        node: {
            fs: `empty`,
        },
    });
};
