const path = require('path');

const { generateCrumbs } = require('../../src/utils/breadcrumb');
const {
    getPageTranslations,
    getPostTranslations,
    getUrlLangPrefix,
    resolvePageUrl,
} = require('../../src/utils/i18n');
const ContentConfig = require('../contentConfig');
const { articlePrefix, langs } = require('../siteConfig');

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
            '../../src/views/templates/PostListWithPagination.jsx',
        );
        const postsPerPage = ContentConfig.posts.perPage;
        const postsWithoutFeatured = posts.filter(
            ({ node }) => !node.frontmatter.featured,
        );
        const numPages = Math.ceil(postsWithoutFeatured.length / postsPerPage);

        Array.from({
            length: numPages,
        }).forEach((_, i) => {
            langs.all.forEach((lang) => {
                const slug =
                    i === 0
                        ? getUrlLangPrefix(lang, articlePrefix)
                        : getUrlLangPrefix(
                              lang,
                              `${articlePrefix}page/${i + 1}/`,
                          );
                createPage({
                    component: PostListWithPagination,
                    context: {
                        breadcrumb: generateCrumbs(slug, lang),
                        currentPage: i + 1,
                        limit: postsPerPage,
                        locale: lang,
                        numPages,
                        skip: i * postsPerPage,
                        translations: getPageTranslations(slug),
                    },
                    path: slug,
                });
            });
        });
    } else {
        // Return PostList.jsx
        const PostList = path.join(
            __dirname,
            '../../src/views/templates/PostList.jsx',
        );
        langs.all.forEach((lang) => {
            const slug = getUrlLangPrefix(lang, articlePrefix);
            createPage({
                component: PostList,
                context: {
                    breadcrumb: generateCrumbs(slug, lang),
                    locale: lang,
                    translations: getPageTranslations(slug),
                },
                path: slug,
            });
        });
    }

    const PostItem = path.join(
        __dirname,
        '../../src/views/templates/PostItem.jsx',
    );
    // Create post detail pages
    posts.forEach(({ node }) => {
        // if (node.frontmatter.path.indexOf('/blog') !== 0) {
        //     throw new Error(`Invalid path prefix: ${node.frontmatter.path}`);
        // }
        const { lang } = node.frontmatter;
        const slug = resolvePageUrl(
            getUrlLangPrefix(lang, node.frontmatter.path),
        );
        createPage({
            component: PostItem,
            context: {
                breadcrumb: generateCrumbs(slug, lang),
                locale: lang,
                postPath: node.frontmatter.path,
                translations: getPostTranslations(posts, node),
            },
            path: slug,
        });
    });
};

module.exports = createPostsPages;
