import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import { injectIntl, intlShape } from "react-intl";

function SEO({
    description,
    meta,
    keywords,
    title,
    intl: { formatMessage, locale }
}) {
    return (
        <StaticQuery
            query={detailsQuery}
            render={data => {
                const metaDescription = formatMessage({
                    id: description || data.site.siteMetadata.description
                });
                const formattedTitle = formatMessage({ id: title });
                return (
                    <Helmet
                        htmlAttributes={{
                            locale
                        }}
                        title={formattedTitle}
                        titleTemplate={`%s | ${formatMessage({
                            id: data.site.siteMetadata.title
                        })}`}
                        meta={[
                            {
                                name: `description`,
                                content: metaDescription
                            },
                            {
                                property: `og:title`,
                                content: formattedTitle
                            },
                            {
                                property: `og:description`,
                                content: metaDescription
                            },
                            {
                                property: `og:type`,
                                content: `website`
                            },
                            {
                                name: `twitter:card`,
                                content: `summary`
                            },
                            {
                                name: `twitter:creator`,
                                content: formatMessage({
                                    id: data.site.siteMetadata.author
                                })
                            },
                            {
                                name: `twitter:title`,
                                content: formattedTitle
                            },
                            {
                                name: `twitter:description`,
                                content: metaDescription
                            }
                        ]
                            .concat(
                                keywords.length > 0
                                    ? {
                                          name: `keywords`,
                                          content: keywords.join(`, `)
                                      }
                                    : []
                            )
                            .concat(meta)}
                    />
                );
            }}
        />
    );
}

SEO.defaultProps = {
    meta: [],
    keywords: []
};

SEO.propTypes = {
    description: PropTypes.string,
    meta: PropTypes.array,
    keywords: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    intl: intlShape.isRequired
};

export default injectIntl(SEO);

const detailsQuery = graphql`
    query DefaultSEOQuery {
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`;
