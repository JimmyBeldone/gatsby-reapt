const path = require(`path`);
const kebabCase = require('lodash.kebabcase');

const Config = require('./config/siteConfig');
const ContentConfig = require('./config/contentConfig');
const { getSlug } = require(`./src/utils/i18n`);
const {
    getPageTranslations,
    getPostTranslations,
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
        `type MarkdownRemark implements Node @infer {
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

    const PostItem = path.resolve('./src/templates/PostItem.js');
    // const ProductItem = path.resolve('./src/templates/ProductItem.js');
    const TagItem = path.resolve('./src/templates/TagItem.js');

    const result = await graphql(`
        {
            posts: allMarkdownRemark(
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
            tagsGroup: allMarkdownRemark(limit: 2000) {
                group(field: frontmatter___tags) {
                    fieldValue
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
            './src/templates/PostListWithPagination.js',
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
                        ? getUrlLangPrefix(lang, '/blog/')
                        : getUrlLangPrefix(lang, `/blog/page/${i + 1}/`);
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
        const PostList = path.resolve('./src/templates/PostList.js');
        Config.langs.all.map(lang => {
            const path = getUrlLangPrefix(lang, '/blog/');
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

    const tags = result.data.tagsGroup.group;

    // If tag pagination
    if (ContentConfig.tags.pagination) {
        const TagListWithPagination = path.resolve(
            './src/templates/TagItemWithPagination.js',
        );
        const tagsPerPage = ContentConfig.tags.perPage;
        const numPages = Math.ceil(tags.length / tagsPerPage);

        Array.from({ length: numPages }).forEach((_, i) => {
            Config.langs.all.map(lang => {
                const path =
                    i === 0
                        ? getUrlLangPrefix(lang, '/blog/')
                        : getUrlLangPrefix(lang, `/blog/page/${i + 1}/`);
                createPage({
                    path,
                    component: TagListWithPagination,
                    context: {
                        limit: tagsPerPage,
                        skip: i * tagsPerPage,
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
        const TagItem = path.resolve('./src/templates/TagItem.js');
        Config.langs.all.map(lang => {
            const path = getUrlLangPrefix(lang, '/blog/');
            createPage({
                path,
                component: TagItem,
                context: {
                    locale: lang,
                    translations: getPageTranslations(path),
                },
            });
        });
    }

    // Create tagItem page
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
                    tagPath: path,
                    translations: getTagTranslations(posts, node, tagIndex),
                },
            });
        });
    });
};

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        node: {
            fs: `empty`,
        },
    });
};
