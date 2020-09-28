const path = require('path');

const { generateCrumbs } = require('../../src/utils/breadcrumb');
const { getSlug, getPageTranslations } = require('../../src/utils/i18n');
const {
    getRecentProducts,
    getFeaturedProducts,
} = require('../../src/utils/products');
const Config = require('../siteConfig');

const createGalleryPages = async (createPage, graphql, reporter) => {
    const result = await graphql(
        `
            {
                products: allProducts(limit: 2000) {
                    group(field: fields___section) {
                        fieldValue
                        totalCount
                    }
                }
            }
        `,
    );

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query (Posts)`);
        return;
    }

    const productsGroups = result.data.products.group;
    const ProductGallery = path.join(
        __dirname,
        '../../src/views/templates/ProductGallery.js',
    );

    // Create post detail pages
    productsGroups.forEach((group) => {
        Config.langs.all.forEach((lang) => {
            const basePath = `/products/product-${group.fieldValue}`;
            const path = getSlug(basePath, lang);
            const filters = [
                { label: 'categories', list: productsGroups, link: true },
            ];

            createPage({
                path,
                component: ProductGallery,
                context: {
                    locale: lang,
                    translations: getPageTranslations(basePath),
                    breadcrumb: generateCrumbs(path, lang),
                    filters,
                    productSection: group.fieldValue,
                    featured: getFeaturedProducts(),
                    recentProducts: getRecentProducts(),
                },
            });
        });
    });
};

module.exports = createGalleryPages;
