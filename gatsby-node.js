// const fs = require('fs');
// const path = require(`path`);
// const kebabCase = require('lodash.kebabcase');

const ContentConfig = require('./config/contentConfig');
const createPostsCategoriesPages = require('./config/posts/categoriesConfig');
const createPostsPages = require('./config/posts/postsConfig.js');
const createPostsTagsPages = require('./config/posts/tagsConfig');
// const createGalleryPages = require('./config/products/galleryConfig');
// const createProductsPages = require('./config/products/productsConfig');
const Config = require('./config/siteConfig');
// const { DEFAULT_IMAGE } = require('./src/constants/global');
const { generateCrumbs } = require('./src/utils/breadcrumb');
const {
    getSlug,
    getPageTranslations,
    getUrlLangPrefix,
} = require('./src/utils/i18n');
// const {
//     getRecentProducts,
//     getFeaturedProducts,
// } = require('./src/utils/products');

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

    return new Promise((resolve) => {
        deletePage(page);

        Config.langs.all.map((lang) => {
            const is404 = page.path === `/404.html`;
            const path = is404
                ? getUrlLangPrefix(lang, page.path)
                : getSlug(page.path, lang);

            const createdPage = {
                ...page,
                path,
                context: {
                    locale: lang,
                    breadcrumb: generateCrumbs(path, lang),
                    translations: getPageTranslations(page.path, is404),
                },
            };

            // if (ContentConfig.products.active) {
            //     createdPage.context.featured = getFeaturedProducts();
            //     createdPage.context.recentProducts = getRecentProducts();
            // }

            return createPage(createdPage);
        });

        resolve();
    });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    // Posts
    if (ContentConfig.posts.active) {
        await createPostsPages(createPage, graphql, reporter);
        await createPostsCategoriesPages(createPage, graphql, reporter);
        if (ContentConfig.tags.active) {
            await createPostsTagsPages(createPage, graphql, reporter);
        }
    }

    // Products
    // if (ContentConfig.products.active) {
    //     await createProductsPages(createPage, graphql, reporter);
    //     await createGalleryPages(createPage, graphql, reporter);
    //     // ContentConfig.products.sections.forEach(section => {
    //     //     // createProductsCategoriesPages(section, createPage, graphql, reporter);
    //     // });
    // }
};

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        node: {
            fs: `empty`,
        },
    });
};
