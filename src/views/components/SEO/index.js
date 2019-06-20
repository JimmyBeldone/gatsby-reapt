import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { injectIntl, intlShape } from 'react-intl';
import siteConfig from 'Config';

import { getLangs } from '../../../utils/lang';
import icon from '../../../images/gatsby-icon.png';

function SEO({
    location,
    title,
    description,
    meta,
    metaIcon,
    keywords,
    translaled,
    is404,
    intl: { formatMessage, locale },
}) {
    const { site } = useStaticQuery(
        graphql`
            query DefaultSEOQuery {
                site {
                    siteMetadata {
                        title
                        description
                        authorName
                        siteUrl
                        icon
                    }
                }
            }
        `,
    );

    const metaDescription = formatMessage({
        id: description || site.siteMetadata.description,
    });

    const formattedTitle = formatMessage({ id: title });
    const formattedTitleAlt = formatMessage({
        id: siteConfig.titleAlt,
    });

    const langPathnames = getLangs(locale, location.pathname, is404);
    const defaultLang = langPathnames.filter(langPath => langPath.default)[0];
    const defaultUrl = location.origin + defaultLang.link;

    const schemaOrgJSONLD = [
        {
            '@context': `http://schema.org`,
            '@type': `WebSite`,
            url: siteConfig.siteUrl,
            name: formattedTitle,
            alternateName: formattedTitleAlt,
        },
    ];

    return (
        <Helmet
            htmlAttributes={{
                lang: locale,
            }}
            title={formattedTitle}
            titleTemplate={`%s | ${formatMessage({
                id: site.siteMetadata.title,
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
                    content: metaIcon,
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
                    content: metaIcon,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    property: `og:url`,
                    content: `${location.origin}${location.pathname}`,
                },
                {
                    property: `og:site_name`,
                    content: siteConfig.name,
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
                    content: metaIcon,
                },
            ]
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
            {/* Add alternate and og:locale tags if page is translated */}
            {translaled
                ? [
                      langPathnames.map(langPath => {
                          return [
                              <link
                                  key={`alternate-${langPath.langKey}`}
                                  rel='alternate'
                                  href={location.origin + langPath.link}
                                  hreflang={langPath.langKey}
                              />,
                              <meta
                                  key={`og:locale-default`}
                                  property='og:locale:alternate'
                                  content={langPath.territory}
                              />,
                          ];
                      }),
                      <link
                          key={`alternate-default`}
                          rel='alternate'
                          hreflang='x-default'
                          href={defaultUrl}
                      />,
                      <meta
                          key={`og:locale-default`}
                          property='og:locale'
                          content={defaultLang.territory}
                      />,
                  ]
                : null}
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
};

SEO.propTypes = {
    description: PropTypes.string,
    meta: PropTypes.array,
    metaIcon: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    location: PropTypes.object.isRequired,
    translaled: PropTypes.bool,
    is404: PropTypes.bool,
};

export default injectIntl(SEO);
