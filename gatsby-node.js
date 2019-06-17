/* eslint-disable security/detect-object-injection */
const locales = require('./src/constants/locales');

exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions;

    // eslint-disable-next-line no-undef
    return new Promise(resolve => {
        deletePage(page);

        if (page.path === '/404.html') {
            createPage({
                ...page,
                path: `/404.html`,
            });
        } else {
            Object.keys(locales).map(lang => {
                const localizedPath = locales[lang].default
                    ? page.path
                    : locales[lang].path + page.path;

                return createPage({
                    ...page,
                    path: localizedPath,
                    context: {
                        locale: lang,
                    },
                });
            });
        }

        resolve();
    });
};
