import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';

import siteConfig from '../../../../config/siteConfig';
import icon from '../../../images/gatsby-icon.png';

function SEO({
    pageType,
    translationsPaths,
    location,
    title,
    description,
    meta,
    metaIcon,
    keywords,
    translaled,
    is404,
    isPost,
    slug,
    intl: { formatMessage, locale },
}) {
    let metaDescription;
    let formattedTitle;
    // let schemaOrgJSONLD;

    if (pageType === 'post' || pageType === 'tag') {
        formattedTitle = title;
        metaDescription = description;
    } else {
        formattedTitle = formatMessage({ id: title });
        metaDescription = formatMessage({
            id: description || siteConfig.description,
        });
    }

    if (pageType === '404') {
        return (
            <Helmet
                htmlAttributes={{
                    lang: locale,
                }}
                title={formattedTitle}
                titleTemplate={`%s | ${formatMessage({
                    id: siteConfig.title,
                })}`}
                defer={false}
            />
        );
    }

    const formattedTitleAlt = formatMessage({
        id: siteConfig.titleAlt,
    });

    const defaultLang = translationsPaths.filter(
        langPath => langPath.default,
    )[0];
    const defaultUrl = siteConfig.siteUrl + defaultLang.link + slug;

    const schemaOrgJSONLD = [
        {
            '@context': `http://schema.org`,
            '@type': `WebSite`,
            url: siteConfig.siteUrl,
            name: formattedTitle,
            alternateName: formattedTitleAlt,
        },
    ];

    const alternateLinks = [];
    const ogLocaleAlternateMeta = [];

    if (translaled) {
        translationsPaths.forEach(langPath => {
            alternateLinks.push(
                <link
                    key={`alternate-${langPath.langKey}`}
                    rel='alternate'
                    href={siteConfig.siteUrl + langPath.link}
                    hrefLang={langPath.langKey}
                />,
            );
            ogLocaleAlternateMeta.push({
                property: `og:locale:alternate`,
                content: langPath.territory,
            });
        });
    }

    return (
        <Helmet
            defer={false}
            htmlAttributes={{
                lang: locale,
            }}
            title={formattedTitle}
            titleTemplate={`%s | ${formatMessage({
                id: siteConfig.title,
            })}`}
            meta={[
                {
                    name: `google-site-verification`,
                    content: siteConfig.googleSiteVerification,
                },
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    name: `ìmage`,
                    content: siteConfig.siteUrl + metaIcon,
                },
                // Open Graph tags
                {
                    property: `og:title`,
                    content: formattedTitle,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:image`,
                    content: siteConfig.siteUrl + metaIcon,
                },
                {
                    property: `og:image:secure_url`,
                    content: siteConfig.siteUrl + metaIcon,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    property: `og:url`,
                    content: location.href,
                },
                {
                    property: `og:site_name`,
                    content: siteConfig.name,
                },
                {
                    property: `og:locale`,
                    content: defaultLang.territory,
                },
                // Twitter Card tags
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: siteConfig.authorTwitter,
                },
                {
                    name: `twitter:title`,
                    content: formattedTitle,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                {
                    name: `twitter:site`,
                    content: siteConfig.social.twitter,
                },
                {
                    name: `twitter:image`,
                    content: siteConfig.siteUrl + metaIcon,
                },
            ]
                .concat(ogLocaleAlternateMeta)
                .concat(
                    keywords.length > 0
                        ? {
                              name: `keywords`,
                              content: keywords.join(`, `),
                          }
                        : [],
                )
                .concat(meta)}
        >
            {alternateLinks.map(link => link)}
            <link
                key='alternate-default'
                rel='alternate'
                hrefLang='x-default'
                href={defaultUrl}
            />
            {/* Set GDPR banner lang  */}
            <script>{`var tarteaucitronForceLanguage = '${locale}';`}</script>
            {/* Schema.org tags */}
            <script type='application/ld+json'>
                {JSON.stringify(schemaOrgJSONLD)}
            </script>
        </Helmet>
    );
}

SEO.defaultProps = {
    pageType: 'normal',
    meta: [],
    keywords: [],
    metaIcon: icon,
    translaled: true,
    is404: false,
    isPost: false,
    slug: ``,
};

SEO.propTypes = {
    pageType: PropTypes.PropTypes.oneOf([
        'normal',
        'post',
        'product',
        'tag',
        '404',
    ]),
    description: PropTypes.string,
    meta: PropTypes.array,
    metaIcon: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    translaled: PropTypes.bool,
    is404: PropTypes.bool,
    isPost: PropTypes.bool,
    slug: PropTypes.string,
    translationsPaths: PropTypes.array.isRequired,
};

export default injectIntl(SEO);
