const locales = require(`../constants/locales`);
const slugs = require(`../lang/slugs.json`);

const slugExist = (originalPath, lang) => {
    if (originalPath === `/`) {
        return originalPath;
    } else {
        return slugs[lang][originalPath] !== undefined
            ? `/${slugs[lang][originalPath]}/`
            : `/${originalPath}/`;
    }
};

exports.getSlug = (path, lang) => {
    const pathItems = path !== `/` ? path.split(`/`) : [`/`];

    const explosedSlug = pathItems.reduce((acc, curr) => {
        if (curr !== ``) acc.push(curr);
        return acc;
    }, []);

    const originalPath = explosedSlug.pop();

    const localizedPath = locales[lang].default
        ? slugExist(originalPath, lang)
        : `/` + locales[lang].path + slugExist(originalPath, lang);

    return localizedPath;
};
