import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';

import siteConfig from '../../../../config/siteConfig';

const SEO = ({
    pageType,
    translationsPaths,
    location,
    title,
    image,
    publishedAt,
    updatedAt,
    description,
    meta,
    keywords,
    translaled,
    is404,
    isPost,
    slug,
    robots,
    tags,
    intl: { formatMessage, locale },
}) => {
    let formattedTitle;
    let metaDescription;
    // let schemaOrgJSONLD;
    const ogType = pageType === 'article' ? pageType : 'website';

    const data = useStaticQuery(graphql`
        query DefaultSEOQuery {
            file(name: { eq: "gatsby-icon" }) {
                childImageSharp {
                    fixed(width: 500) {
                        ...GatsbyImageSharpFixed_noBase64
                    }
                }
            }
        }
    `);

    if (pageType === 'website') {
        formattedTitle = formatMessage({ id: title });
        metaDescription = formatMessage({
            id: description || siteConfig.description,
        });
    } else {
        formattedTitle = title;
        metaDescription = description;
    }

    if (pageType === 'article') {
    }

    const metaImage = image ? image.url : data.file.childImageSharp.fixed.src;

    const metaImageUrl = siteConfig.siteUrl + metaImage;
    const metaImageAlt = image ? image.alt : metaDescription;

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
            alternateLinks.push({
                rel: 'alternate',
                href: siteConfig.siteUrl + langPath.link,
                hrefLang: langPath.langKey,
            });
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
                    name: `image`,
                    content: metaImageUrl,
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
                    content: metaImageUrl,
                },
                {
                    property: `og:image:secure_url`,
                    content: metaImageUrl,
                },
                {
                    property: 'og:image:alt',
                    content: metaImageAlt,
                },
                {
                    property: `og:type`,
                    content: ogType,
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
                    content: metaImageUrl,
                },
                {
                    name: 'twitter:image:alt',
                    content: metaImageAlt,
                },
            ]
                .concat(
                    robots ? { name: 'robots', content: 'index, follow' } : [],
                )
                .concat(ogLocaleAlternateMeta)
                .concat(
                    publishedAt
                        ? [
                              {
                                  property: 'article:published_time',
                                  content: publishedAt,
                              },
                          ]
                        : [],
                    updatedAt
                        ? [
                              {
                                  name: `article:modified_time`,
                                  content: updatedAt,
                              },
                          ]
                        : [],
                )
                .concat(
                    keywords.length > 0 || tags.length > 0
                        ? {
                              name: `keywords`,
                              content: siteConfig.keywords
                                  .concat(keywords)
                                  .concat(tags)
                                  .join(`, `),
                          }
                        : [],
                )
                .concat(meta)}
            link={[{ rel: 'canonical', href: location.href }]
                .concat(alternateLinks)
                .concat({
                    rel: 'alternate',
                    hrefLang: 'x-default',
                    href: defaultUrl,
                })}
        >
            {/* Set GDPR banner lang  */}
            <script>{`var tarteaucitronForceLanguage = '${locale}';`}</script>
            {/* Schema.org tags */}
            <script type='application/ld+json'>
                {JSON.stringify(schemaOrgJSONLD)}
            </script>
        </Helmet>
    );
};

SEO.defaultProps = {
    pageType: 'website',
    publishedAt: null,
    updatedAt: null,
    meta: [],
    keywords: [],
    translaled: true,
    is404: false,
    isPost: false,
    slug: ``,
    robots: true,
    tags: [],
};

SEO.propTypes = {
    pageType: PropTypes.PropTypes.oneOf([
        'website',
        'article',
        'product',
        'tag',
        '404',
    ]),
    description: PropTypes.string,
    meta: PropTypes.arrayOf(
        PropTypes.shape({
            property: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        }),
    ),
    image: PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
    }),
    publishedAt: PropTypes.string,
    updatedAt: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    translaled: PropTypes.bool,
    is404: PropTypes.bool,
    isPost: PropTypes.bool,
    slug: PropTypes.string,
    translationsPaths: PropTypes.array.isRequired,
    robots: PropTypes.bool,
    tags: PropTypes.array,
};

export default injectIntl(SEO);
