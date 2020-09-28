const path = require('path');

const { generateCrumbs } = require('../../src/utils/breadcrumb');
const {
    getProductTranslations,
    getRecentProducts,
    getFeaturedProducts,
} = require('../../src/utils/products');

const createProductsPages = async (createPage, graphql, reporter) => {
    const result = await graphql(
        `
            {
                products: allProducts(limit: 2000) {
                    edges {
                        node {
                            id
                            index
                            titre
                            lang
                            collection
                            fields {
                                section
                                fileAbsolutePath
                                path
                            }
                        }
                    }
                }
            }
        `,
    );

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query (Posts)`);
        return;
    }

    const products = result.data.products.edges;

    const ProductItem = path.join(
        __dirname,
        '../../src/views/templates/ProductItem.js',
    );

    // Create post detail pages
    products.forEach(({ node }) => {
        const { lang, collection } = node;
        const { path, section } = node.fields;

        createPage({
            path,
            component: ProductItem,
            context: {
                locale: lang,
                productPath: path,
                translations: getProductTranslations(products, node),
                breadcrumb: generateCrumbs(path, lang),
                productCollection: collection,
                ProductSection: section,
                featured: getFeaturedProducts(),
                recentProducts: getRecentProducts(),
            },
        });
    });
};

module.exports = createProductsPages;
