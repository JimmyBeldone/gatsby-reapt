const Config = require('../../config/siteConfig');

const excludedPaths = [
    `/dev-404-page`,
    `/404`,
    `/404.html`,
    `/offline-plugin-app-shell-fallback`,
];

const generateCrumbs = (path, lang) => {
    if (!excludedPaths.includes(path)) {
        let acc = '';
        let crumbs = [];

        const pathPrefix =
            lang === Config.langs.default.lang ? null : `/${lang}`;

        const splitUrl = pathPrefix
            ? path.replace(new RegExp(`^${pathPrefix}`), '').split('/')
            : path.split('/');
        splitUrl.forEach((split, index) => {
            if (index === 0 && split === '') {
                // root or 'home' section of path
                crumbs = [
                    ...crumbs,
                    {
                        pathname: pathPrefix !== null ? pathPrefix : '/',
                        crumbLabel: 'Home',
                    },
                ];
            } else if (index !== 0 && split !== '') {
                // remaining sections of path
                acc +=
                    pathPrefix !== null
                        ? pathPrefix + `/${split}`
                        : `/${split}`;
                const n = acc.lastIndexOf('/');
                crumbs = [
                    ...crumbs,
                    {
                        pathname: acc,
                        crumbLabel: acc.slice(n + 1).replace(/-/g, ' '),
                    },
                ];
            } else {
                // catch empty path sections
                crumbs = [...crumbs];
            }
        });
        const breadcrumb = {
            location: path,
            crumbs,
        };
        return breadcrumb;
    }
};

module.exports = { generateCrumbs };
