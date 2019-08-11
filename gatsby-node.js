const locales = require(`./src/constants/locales`);
const { getSlug } = require(`./src/utils/slugs`);

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

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        node: {
            fs: `empty`,
        },
    });
};
