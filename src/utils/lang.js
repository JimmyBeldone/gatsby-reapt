/* eslint-disable security/detect-object-injection */
import locales from '../constants/locales';

export const flattenMessages = (nestedMessages, prefix = ``) =>
    Object.keys(nestedMessages).reduce((messages, key) => {
        const value = nestedMessages[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === `string`) {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});

const getHomeLink = langKey => {
    return locales[langKey].default ? `/` : `/${locales[langKey].path}/`;
};

export const getUrlForLang = (
    pathname,
    langKey,
    currentLangKey,
    homeLink,
    is404,
) => {
    const isDefault = locales[langKey].default ? true : false;
    if (is404) {
        return isDefault
            ? langKey !== currentLangKey
                ? `/404/`
                : pathname
            : `/${langKey}/404/`;
    } else {
        return isDefault
            ? langKey !== currentLangKey
                ? pathname.replace(homeLink, `/`)
                : pathname
            : pathname.replace(homeLink, `/${langKey}/`);
    }
};

export const getLangs = (currentLangKey, pathname, is404) => {
    const langs = Object.keys(locales);
    const homeLink = getHomeLink(currentLangKey);

    return langs.map(langKey => {
        return {
            langKey,
            langValue: locales[langKey].locale,
            selected: currentLangKey === langKey,
            link: getUrlForLang(
                pathname,
                langKey,
                currentLangKey,
                homeLink,
                is404,
            ),
            default: locales[langKey].default !== undefined,
        };
    });
};
