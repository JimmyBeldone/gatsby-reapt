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
    pageType,
    translationsPaths,
    location,
    title,
    image,
    description,
    meta,
    translated,
    robots,
    post,
    product,
    article,
    intl: { formatMessage, locale },
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
        langPath => langPath.default,
    )[0];
    const defaultUrl = siteConfig.siteUrl + defaultLang.link;

    // Manage i18n
    const alternateLinks = [];
    const ogLocaleAlternateMeta = [];

    if (translated) {
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
            link={[{ rel: 'canonical', href: location.href }]
                .concat(alternateLinks)
                .concat({
                    rel: 'alternate',
                    hrefLang: 'x-default',
                    href: defaultUrl,
                })}
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
            ]
                .concat(twitterCard)
                .concat(ogMeta)
                .concat(ogLocaleAlternateMeta)
                .concat(
                    robots ? { name: 'robots', content: 'index, follow' } : [],
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
    pageType: 'website',
    meta: [],
    translated: true,
    robots: true,
    post: null,
    product: null,
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
    title: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    translated: PropTypes.bool,
    translationsPaths: PropTypes.array.isRequired,
    robots: PropTypes.bool,
    post: PropTypes.object,
    article: PropTypes.object,
    product: PropTypes.object,
    intl: PropTypes.object.isRequired,
};

export default injectIntl(SEO);
