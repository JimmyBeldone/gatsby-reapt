import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { injectIntl, intlShape } from 'react-intl';

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

    const langPathnames = getLangs(locale, location.pathname, is404);
    const defaultPathname = langPathnames.filter(
        langPath => langPath.default,
    )[0].link;
    const defaultUrl = location.origin + defaultPathname;

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
                    content: process.env.GATSBY_GOOGLE_SITE_VERIFICATION,
                },
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
            {translaled
                ? [
                      langPathnames.map(langPath => {
                          return (
                              <link
                                  key={`alternate-${langPath.langKey}`}
                                  rel='alternate'
                                  href={location.origin + langPath.link}
                                  hreflang={langPath.langKey}
                              />
                          );
                      }),
                      <link
                          key={`alternate-default`}
                          rel='alternate'
                          hreflang='x-default'
                          href={defaultUrl}
                      />,
                  ]
                : null}
            <script>{`var tarteaucitronForceLanguage = '${locale}';`}</script>
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
