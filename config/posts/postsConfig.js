const path = require('path');

const ContentConfig = require('../contentConfig');
const { articlePrefix, langs } = require('../siteConfig');
const {
    getPageTranslations,
    getPostTranslations,
    getUrlLangPrefix,
    resolvePageUrl,
} = require('../../src/utils/i18n');
const { generateCrumbs } = require('../../src/utils/breadcrumb');

const createPostsPages = async (createPage, graphql, reporter) => {
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
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query (Posts)`);
        return;
    }

    const posts = result.data.posts.edges;

    // If post pagination
    if (ContentConfig.posts.pagination) {
        const PostListWithPagination = path.join(
            __dirname,
            '../../src/views/templates/PostListWithPagination.js',
        );
        const postsPerPage = ContentConfig.posts.perPage;
        const postsWithoutFeatured = posts.filter(
            ({ node }) => !node.frontmatter.featured,
        );
        const numPages = Math.ceil(postsWithoutFeatured.length / postsPerPage);

        Array.from({
            length: numPages,
        }).forEach((_, i) => {
            langs.all.map(lang => {
                const path =
                    i === 0
                        ? getUrlLangPrefix(lang, articlePrefix)
                        : getUrlLangPrefix(
                              lang,
                              `${articlePrefix}page/${i + 1}/`,
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
                        breadcrumb: generateCrumbs(path, lang),
                    },
                });
            });
        });
    } else {
        // Return PostList.js
        const PostList = path.join(
            __dirname,
            '../../src/views/templates/PostList.js',
        );
        langs.all.map(lang => {
            const path = getUrlLangPrefix(lang, articlePrefix);
            createPage({
                path,
                component: PostList,
                context: {
                    locale: lang,
                    translations: getPageTranslations(path),
                    breadcrumb: generateCrumbs(path, lang),
                },
            });
        });
    }

    const PostItem = path.join(
        __dirname,
        '../../src/views/templates/PostItem.js',
    );
    // Create post detail pages
    posts.forEach(({ node }) => {
        // if (node.frontmatter.path.indexOf('/blog') !== 0) {
        //     throw new Error(`Invalid path prefix: ${node.frontmatter.path}`);
        // }
        const lang = node.frontmatter.lang;
        const path = resolvePageUrl(
            getUrlLangPrefix(lang, node.frontmatter.path),
        );
        createPage({
            path,
            component: PostItem,
            context: {
                locale: lang,
                postPath: node.frontmatter.path,
                translations: getPostTranslations(posts, node),
                breadcrumb: generateCrumbs(path, lang),
            },
        });
    });
};

module.exports = createPostsPages;
