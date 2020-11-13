const kebabCase = require('lodash.kebabcase');

const SiteConfig = require('../../config/siteConfig');
const locales = require('../constants/locales');

const slugs = require(`../lang/slugs.json`);

/**
 * Get posts from same folder
 *
 * @param {Array} postList List of all posts
 * @param {Object} post Current Post
 * @returns {Array} posts from same folder
 */
const getPostsFromSameFolder = (postList, post) => {
    return postList.filter(
        ({ node }) =>
            node.fileAbsolutePath.split('/').slice(-2, -1)[0] ===
            post.fileAbsolutePath.split('/').slice(-2, -1)[0],
    );
};

/**
 * Join provided url paths.
 * @param {...string} paths Provided paths. It doesn't matter if they have trailing slash.
 * @return {string} Resolved url without trailing slash.
 */
const resolveUrl = (...paths) => {
    return paths.reduce((resolvedUrl, path) => {
        const urlPath = path.toString().trim();
        if (urlPath) {
            // eslint-disable-next-line no-param-reassign
            resolvedUrl +=
                (resolvedUrl === '' ? '' : '/') +
                urlPath.replace(/^\/|\/$/g, '');
        }
        return resolvedUrl;
    }, '');
};
/**
 * Resolve a page url adding a trailing slash.
 * Needed to prevent 301 redirects cause of Gatsby.js' folder structure.
 * @param {...string} path Provided paths. It doesn't matter if they have trailing slash.
 * @return {string} Resolved url with trailing slash.
 */
const resolvePageUrl = (...path) => {
    if (path[0] === '/') {
        return '/';
    }
    const resolvedUrl = resolveUrl(...path);
    return `/${resolvedUrl}/`;
};

/**
 * Get url lang prefix
 *
 * @param {String} lang Current lang
 * @param {String} path Path
 * @returns {String} Prefixed path with correct lang
 */
const getUrlLangPrefix = (lang, path) => {
    const defaultLang = SiteConfig.langs.default.lang;
    return lang === defaultLang ? path : `/${lang + path}`;
};

const prefixes = ['/'];
SiteConfig.langs.others.forEach((langData) => {
    prefixes.push(`/${langData.lang}/`);
});
const isHomePage = (path) => prefixes.some((prefix) => prefix === path);

const getTranslationObject = (lang, path) => {
    return {
        default: !!locales[lang].default,
        langKey: lang,
        langValue: locales[lang].locale,
        link: path,
        territory: locales[lang].territory,
    };
};

const slugExist = (path, lang) => {
    if (path === `/`) {
        return path;
    }
    return slugs[lang][path] !== undefined
        ? `/${slugs[lang][path]}/`
        : `/${path}/`;
};

const getSlug = (path, lang) => {
    const pathItems = path !== `/` ? path.split(`/`) : [`/`];

    const explosedSlug = pathItems.reduce((acc, curr) => {
        if (curr !== ``) acc.push(curr);
        return acc;
    }, []);

    const test = [];
    explosedSlug.forEach((slug) => {
        test.push(slugExist(slug, lang));
    });

    const originalPath = test.join('');

    let localizedPath = getUrlLangPrefix(lang, originalPath);
    localizedPath += localizedPath.endsWith('/') ? '' : '/';

    return localizedPath;
};

const selectSlug = (baseUrl, context, lang) => {
    const slug = context.translations.filter((item) => item.langKey === lang)[0]
        .link;
    return baseUrl + slug;
};

/**
 * Pass a post and retrieve a list of related translations.
 *
 * @param {Object} postList The list of posts where search translations. It accepts a `edges` array from Graphql's query `allMdx`
 * @param {Object} post The post of which retrieve its translations. It accepts a `node` object from Graphql's query `allMdx`
 * @return {Object} An array of objects with languages as keys (ISO 639-1) and translated post's paths as values.
 */
const getPostTranslations = (postList, post) => {
    const postsFromSameFolder = getPostsFromSameFolder(postList, post);

    return postsFromSameFolder.map(({ node }) => {
        const { lang } = node.frontmatter;
        const path = getUrlLangPrefix(
            lang,
            resolvePageUrl(node.frontmatter.path),
        );

        return getTranslationObject(lang, path);
    });
};

/**
 * Pass a post and retrieve a list of related translations.
 *
 * @param {Object} postList The list of posts where search translations. It accepts a `edges` array from Graphql's query `allMdx`
 * @param {Object} post The post of which retrieve its translations. It accepts a `node` object from Graphql's query `allMdx`
 * @return {Object} An array of objects with languages as keys (ISO 639-1) and translated post's paths as values.
 */
const getCategoryTranslations = (postList, post) => {
    const postsFromSameFolder = getPostsFromSameFolder(postList, post);

    return postsFromSameFolder.map(({ node }) => {
        const { lang } = node.frontmatter;
        const path = getUrlLangPrefix(
            lang,
            `/category/${kebabCase(node.frontmatter.category)}/`,
        );

        return getTranslationObject(lang, path);
    });
};

/**
 * Pass a post and retrieve a list of related translations.
 *
 * @param {Object} postList The list of posts where search translations. It accepts a `edges` array from Graphql's query `allMdx`
 * @param {Object} post The post of which retrieve its translations. It accepts a `node` object from Graphql's query `allMdx`
 * @param {Number} tagIndex Position of the tag inside the Tags array
 * @return {Object} An array of objects with languages as keys (ISO 639-1) and translated post's paths as values.
 */
const getTagTranslations = (postList, post, tagIndex) => {
    const postsFromSameFolder = getPostsFromSameFolder(postList, post);

    return postsFromSameFolder.map(({ node }) => {
        const { lang } = node.frontmatter;
        const { tags } = node.frontmatter;
        const path = getUrlLangPrefix(
            lang,
            `/tags/${kebabCase(tags[tagIndex])}/`,
        );

        return getTranslationObject(lang, path);
    });
};

const getPageTranslations = (path, is404 = false) => {
    return SiteConfig.langs.all.map((lang) => {
        const url = is404 ? getUrlLangPrefix(lang, path) : getSlug(path, lang);
        return getTranslationObject(lang, url);
    });
};

module.exports = {
    getCategoryTranslations,
    getPageTranslations,
    getPostTranslations,
    getPostsFromSameFolder,
    getSlug,
    getTagTranslations,
    getTranslationObject,
    getUrlLangPrefix,
    isHomePage,
    resolvePageUrl,
    resolveUrl,
    selectSlug,
};
