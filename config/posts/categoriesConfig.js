const kebabCase = require('lodash.kebabcase');
const path = require('path');

const { generateCrumbs } = require('../../src/utils/breadcrumb');
const {
    getCategoryTranslations,
    getUrlLangPrefix,
} = require('../../src/utils/i18n');
const ContentConfig = require('../contentConfig');

const createPostsCategoriesPages = async (createPage, graphql, reporter) => {
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
        reporter.panicOnBuild(
            `Error while running GraphQL query (PostsCategories)`,
        );
        return;
    }

    const categories = result.data.categoriesGroup.group;
    const posts = result.data.posts.edges;

    // If category pagination
    if (ContentConfig.posts.pagination) {
        const CategoryItemWithPagination = path.join(
            __dirname,
            '../../src/views/templates/CategoryItemWithPagination.js',
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
                Array.from({
                    length: numPages,
                }).forEach((_, i) => {
                    const path = i === 0 ? link : `${link}page/${i + 1}/`;
                    createPage({
                        component: CategoryItemWithPagination,
                        context: {
                            breadcrumb: generateCrumbs(path, lang),
                            category: cat.fieldValue,
                            currentPage: i + 1,
                            limit: postsPerPage,
                            locale: lang,
                            numPages,
                            skip: i * postsPerPage,
                            translations: getCategoryTranslations(posts, node),
                        },
                        path,
                    });
                });
            });
        });
    } else {
        // Return PostList.js
        const CategoryItem = path.join(
            __dirname,
            '../../src/views/templates/CategoryItem.js',
        );

        categories.forEach((cat) => {
            cat.edges.forEach(({ node }) => {
                const lang = node.frontmatter.lang;
                const path = getUrlLangPrefix(
                    lang,
                    `/category/${kebabCase(cat.fieldValue)}/`,
                );

                createPage({
                    component: CategoryItem,
                    context: {
                        breadcrumb: generateCrumbs(path, lang),
                        categoty: cat.fieldValue,
                        locale: lang,
                        translations: getCategoryTranslations(posts, node),
                    },
                    path,
                });
            });
        });
    }
};

module.exports = createPostsCategoriesPages;
