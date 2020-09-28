const featuredConfig = require('../../content/featured');
const recentProductsConfig = require('../../content/recentProducts');
const { getTranslationObject } = require('./i18n');

const getProductsFromSameFolder = (productList, product) => {
    return productList.filter(
        ({ node }) =>
            node.fields.fileAbsolutePath.split('/').slice(-2, -1)[0] ===
                product.fields.fileAbsolutePath.split('/').slice(-2, -1)[0] &&
            node.index === product.index,
    );
};

const getProductTranslations = (productList, product) => {
    const postsFromSameFolder = getProductsFromSameFolder(productList, product);

    return postsFromSameFolder.map(({ node }) => {
        const { lang, fields } = node;
        return getTranslationObject(lang, fields.path);
    });
};

const getRecentProducts = () => {
    return recentProductsConfig;
};

const getFeaturedProducts = () => {
    return featuredConfig;
};

module.exports = {
    getProductsFromSameFolder,
    getProductTranslations,
    getRecentProducts,
    getFeaturedProducts,
};
