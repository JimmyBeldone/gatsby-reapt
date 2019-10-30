const path = require(`path`);
const Config = require('./config/siteConfig');

const locales = require(`./src/constants/locales`);
const { getSlug } = require(`./src/utils/slugs`);
const utils = require('./src/utils/posts');

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

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
        {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
            ) {
                edges {
                    node {
                        frontmatter {
                            lang
                            path
                        }
                        fileAbsolutePath
                    }
                }
            }
        }
    `);

    const { allMarkdownRemark } = result.data;
    allMarkdownRemark.edges.forEach(({ node }) => {
        if (node.frontmatter.path.indexOf('/blog') !== 0) {
            throw new Error(`Invalid path prefix: ${node.frontmatter.path}`);
        }
        const lang = node.frontmatter.lang;
        const defaultLang = Config.langs.default.lang;
        createPage({
            path:
                lang === defaultLang
                    ? node.frontmatter.path
                    : `/${lang}${node.frontmatter.path}`,
            component: path.resolve(`./src/templates/blog-post.js`),
            context: {
                locale: lang,
                postPath: node.frontmatter.path,
                translations: utils.getRelatedTranslations(
                    node,
                    allMarkdownRemark.edges,
                ),
            },
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
