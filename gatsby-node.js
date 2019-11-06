const path = require(`path`);
const kebabCase = require('lodash.kebabcase');
const Config = require('./config/siteConfig');

const locales = require(`./src/constants/locales`);
const { getSlug } = require(`./src/utils/slugs`);
const utils = require('./src/utils/posts');

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    createTypes(`
        type Frontmatter @infer {
            featuredImage: File @fileByAbsolutePath(path: "src")
        }
        type MarkdownRemark implements Node @infer {
            frontmatter: Frontmatter
        }
    `);
};

exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions;

    // eslint-disable-next-line no-undef
    return new Promise(resolve => {
        deletePage(page);

        if (page.path === `/404.html`) {
            createPage({
                ...page,
                path: `/404.html`,
                originalPath: `/404.html`,
            });
        } else {
            Object.keys(locales).map(lang => {
                const localizedPath = getSlug(page.path, lang);

                return createPage({
                    ...page,
                    path: localizedPath,
                    context: {
                        locale: lang,
                        originalPath: page.path,
                    },
                });
            });
        }

        resolve();
    });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const PostItem = path.resolve('./src/templates/PostItem.js');
    const ProductItem = path.resolve('./src/templates/ProductItem.js');
    const TagItem = path.resolve('./src/templates/TagItem.js');

    const defaultLang = Config.langs.default.lang;

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
                            tags
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
    // Create post detail pages
    posts.forEach(({ node }) => {
        // if (node.frontmatter.path.indexOf('/blog') !== 0) {
        //     throw new Error(`Invalid path prefix: ${node.frontmatter.path}`);
        // }
        const lang = node.frontmatter.lang;
        createPage({
            path:
                lang === defaultLang
                    ? node.frontmatter.path
                    : `/${lang}${node.frontmatter.path}/`,
            component: PostItem,
            context: {
                locale: lang,
                postPath: node.frontmatter.path,
                translations: utils.getRelatedTranslations(node, posts),
            },
        });
    });

    const tags = result.data.tagsGroup.group;
    // Create tagItem page
    tags.forEach(tag => {
        tag.edges.forEach(({ node }) => {
            const lang = node.frontmatter.lang;
            const postTags = node.frontmatter.tags;
            const tagIndex = postTags.indexOf(tag.fieldValue);
            const path =
                lang === defaultLang
                    ? `/tags/${kebabCase(tag.fieldValue)}/`
                    : `/${lang}/tags/${kebabCase(tag.fieldValue)}/`;

            createPage({
                path,
                component: TagItem,
                context: {
                    tag: tag.fieldValue,
                    locale: lang,
                    tagPath: path,
                    translations: utils.getTagtranslation(
                        node,
                        posts,
                        tagIndex,
                    ),
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
