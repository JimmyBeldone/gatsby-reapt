const kebabCase = require('lodash.kebabcase');
const path = require('path');

const { generateCrumbs } = require('../../src/utils/breadcrumb');
const {
    getTagTranslations,
    getUrlLangPrefix,
} = require('../../src/utils/i18n');
const ContentConfig = require('../contentConfig');

const createPostsTagsPages = async (createPage, graphql, reporter) => {
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
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query (PostsTags)`);
        return;
    }

    const tags = result.data.tagsGroup.group;
    const posts = result.data.posts.edges;
    // If tag pagination
    if (ContentConfig.posts.pagination) {
        const TagListWithPagination = path.join(
            __dirname,
            '../../src/views/templates/TagItemWithPagination.js',
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
                        component: TagListWithPagination,
                        context: {
                            breadcrumb: generateCrumbs(path, lang),
                            currentPage: i + 1,
                            limit: postsPerPage,
                            locale: lang,
                            numPages,
                            skip: i * postsPerPage,
                            tag: tag.fieldValue,
                            translations: getTagTranslations(
                                posts,
                                node,
                                tagIndex,
                            ),
                        },
                        path,
                    });
                });
            });
        });
    } else {
        // Return PostList.js
        const TagItem = path.join(
            __dirname,
            '../../src/views/templates/TagItem.js',
        );

        tags.forEach((tag) => {
            tag.edges.forEach(({ node }) => {
                const lang = node.frontmatter.lang;
                const postTags = node.frontmatter.tags;
                const tagIndex = postTags.indexOf(tag.fieldValue);
                const path = getUrlLangPrefix(
                    lang,
                    `/tags/${kebabCase(tag.fieldValue)}/`,
                );

                createPage({
                    component: TagItem,
                    context: {
                        breadcrumb: generateCrumbs(path, lang),
                        locale: lang,
                        tag: tag.fieldValue,
                        translations: getTagTranslations(posts, node, tagIndex),
                    },
                    path,
                });
            });
        });
    }
};
module.exports = createPostsTagsPages;
