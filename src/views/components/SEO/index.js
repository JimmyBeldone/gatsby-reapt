import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';

import siteConfig from '../../../../config/siteConfig';
import { getLangs } from '../../../utils/lang';
import icon from '../../../images/gatsby-icon.png';

function SEO({
    originalPath,
    location,
    title,
    description,
    meta,
    metaIcon,
    keywords,
    translaled,
    is404,
    slug,
    intl: { formatMessage, locale },
}) {
    const metaDescription = formatMessage({
        id: description || siteConfig.description,
    });

    const formattedTitle = formatMessage({ id: title });

    if (is404) {
        return (
            <Helmet
                htmlAttributes={{
                    lang: locale,
                }}
                title={formattedTitle}
                titleTemplate={`%s | ${formatMessage({
                    id: siteConfig.title,
                })}`}
            />
        );
    }

    const formattedTitleAlt = formatMessage({
        id: siteConfig.titleAlt,
    });

    const langPathnames = getLangs(locale, originalPath, is404);
    const defaultLang = langPathnames.filter(langPath => langPath.default)[0];
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
        langPathnames.forEach(langPath => {
            alternateLinks.push(
                <link
                    key={`alternate-${langPath.langKey}`}
                    rel='alternate'
                    href={siteConfig.siteUrl + langPath.link}
                    hreflang={langPath.langKey}
                />,
            );
            ogLocaleAlternateMeta.push({
                name: `og:locale:alternate`,
                content: langPath.territory,
            });
        });
    }

    return (
        <Helmet
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
                key={`alternate-default`}
                rel='alternate'
                hreflang='x-default'
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
    meta: [],
    keywords: [],
    metaIcon: icon,
    translaled: true,
    is404: false,
    slug: ``,
};

SEO.propTypes = {
    description: PropTypes.string,
    meta: PropTypes.array,
    metaIcon: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    originalPath: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    translaled: PropTypes.bool,
    is404: PropTypes.bool,
    slug: PropTypes.string,
};

export default injectIntl(SEO);
