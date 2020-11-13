import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { injectIntl } from 'react-intl';

import siteConfig from '../../../../config/siteConfig';
import getJsonLd from './getJsonLd';
import getOpenGraphMeta from './getOpenGraphMeta';
import getTwitterMeta from './getTwitterMeta';

const SEO = ({
    // article,
    description,
    image,
    intl: { formatMessage, locale },
    location,
    meta,
    pageType,
    post,
    product,
    robots,
    title,
    translated,
    translationsPaths,
}) => {
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

    // Fomat title & escription
    let formattedTitle;
    let metaDescription;

    const formattedTitleAlt = formatMessage({
        id: siteConfig.titleAlt,
    });

    if (pageType === 'website') {
        formattedTitle = formatMessage({ id: title });
        metaDescription = formatMessage({
            id: description || siteConfig.description,
        });
    } else {
        formattedTitle = title.trim();
        metaDescription = description.trim();
    }

    // Image
    const metaImage = image ? image.url : data.file.childImageSharp.fixed.src;
    const metaImageUrl = siteConfig.siteUrl + metaImage;
    const metaImageAlt = image ? image.alt : metaDescription;

    // Manage 404
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

    const defaultLang = translationsPaths.filter(
        (langPath) => langPath.default,
    )[0];
    const defaultUrl = siteConfig.siteUrl + defaultLang.link;

    // Manage i18n
    const alternateLinks = [];
    const ogLocaleAlternateMeta = [];

    if (translated) {
        translationsPaths.forEach((langPath) => {
            alternateLinks.push({
                href: siteConfig.siteUrl + langPath.link,
                hrefLang: langPath.langKey,
                rel: 'alternate',
            });
            ogLocaleAlternateMeta.push({
                content: langPath.territory,
                property: `og:locale:alternate`,
            });
        });
    }

    // Manage Twitter CArds & Open Graph Meta
    const base = [formattedTitle, metaDescription, metaImageUrl, metaImageAlt];
    const ogBase = [...base, pageType, location.href, defaultLang.territory]
        .concat(pageType === 'article' ? post : null)
        .concat(pageType === 'product' ? product : null)
        .concat(data.file.childImageSharp.fixed.src)
        .concat(formattedTitleAlt);

    const twitterCard = getTwitterMeta(...base);
    const ogMeta = getOpenGraphMeta(...ogBase);
    const jsonLd = getJsonLd(...ogBase);

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
            link={[{ href: location.href, rel: 'canonical' }]
                .concat(alternateLinks)
                .concat({
                    href: defaultUrl,
                    hrefLang: 'x-default',
                    rel: 'alternate',
                })}
            meta={[
                {
                    content: siteConfig.googleSiteVerification,
                    name: `google-site-verification`,
                },
                {
                    content: metaDescription,
                    name: `description`,
                },
                {
                    content: metaImageUrl,
                    name: `image`,
                },
            ]
                .concat(twitterCard)
                .concat(ogMeta)
                .concat(ogLocaleAlternateMeta)
                .concat(
                    robots ? { content: 'index, follow', name: 'robots' } : [],
                )
                // Rest of optional meta props
                .concat(meta)}
        >
            {/* Set GDPR banner lang  */}
            <script>{`var tarteaucitronForceLanguage = '${locale}';`}</script>
            {/* Schema.org tags */}
            <script type='application/ld+json'>{JSON.stringify(jsonLd)}</script>
        </Helmet>
    );
};

SEO.defaultProps = {
    // article: null,
    description: null,
    image: null,
    meta: [],
    pageType: 'website',
    post: null,
    product: null,
    robots: true,
    translated: true,
};

SEO.propTypes = {
    // article: PropTypes.object,
    description: PropTypes.string,
    image: PropTypes.shape({
        alt: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }),
    intl: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    meta: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.string.isRequired,
            property: PropTypes.string.isRequired,
        }),
    ),
    pageType: PropTypes.PropTypes.oneOf([
        'website',
        'article',
        'product',
        'tag',
        '404',
    ]),
    post: PropTypes.object,
    product: PropTypes.object,
    robots: PropTypes.bool,
    title: PropTypes.string.isRequired,
    translated: PropTypes.bool,
    translationsPaths: PropTypes.array.isRequired,
};

export default injectIntl(SEO);
