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

const getSlug = (path, lang) => {
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

const selectSlug = (baseUrl, context, lang) => {
    let slug;
    if (context.originalPath === null) {
        slug = context.translations.filter(item => item.langKey === lang)[0]
            .link;
    } else {
        slug = getSlug(context.originalPath, lang);
    }
    return baseUrl + slug;
};

module.exports = { selectSlug, getSlug };
