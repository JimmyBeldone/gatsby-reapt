import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { injectIntl, intlShape } from 'react-intl';

import icon from '../../../images/gatsby-icon.png';

function SEO({
    location,
    title,
    description,
    meta,
    metaIcon,
    keywords,
    intl: { formatMessage, locale },
}) {
    const { site } = useStaticQuery(
        graphql`
            query DefaultSEOQuery {
                site {
                    siteMetadata {
                        title
                        description
                        author
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
                    name: `description`,
                    content: metaDescription,
                },
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
                    content: site.siteMetadata.siteUrl,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
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
                    content: site.siteMetadata.siteUrl,
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
            <script>{`var tarteaucitronForceLanguage = '${locale}';`}</script>
        </Helmet>
    );
}

SEO.defaultProps = {
    meta: [],
    keywords: [],
    metaIcon: icon,
};

SEO.propTypes = {
    description: PropTypes.string,
    meta: PropTypes.array,
    metaIcon: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    location: PropTypes.object.isRequired,
};

export default injectIntl(SEO);
