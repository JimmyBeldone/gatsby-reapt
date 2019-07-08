const locales = require(`../constants/locales`);
const slugs = require(`../lang/slugs.json`);

const slugExist = (filename, lang) => {
    if (filename === `/`) {
        return filename;
    } else {
        return slugs[lang][filename] !== undefined
            ? `/${slugs[lang][filename]}/`
            : `/${filename}/`;
    }
};

exports.getSlug = (path, lang) => {
    const pathItems = path !== `/` ? path.split(`/`) : [`/`];

    const explosedSlug = pathItems.reduce((acc, curr) => {
        if (curr !== ``) acc.push(curr);
        return acc;
    }, []);

    const fileName = explosedSlug.pop();

    const localizedPath = locales[lang].default
        ? slugExist(fileName, lang)
        : `/` + locales[lang].path + slugExist(fileName, lang);

    return localizedPath;
};
