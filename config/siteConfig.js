const activeEnv = process.env.MODE || process.env.NODE_ENV || `development`;

// eslint-disable-next-line import/no-extraneous-dependencies
require(`dotenv`).config({
    path: `.env.${activeEnv}`,
});

module.exports = {
    // SEO
    name: `Gatsby Reapt`,
    title: `demo.meta.title`,
    titleAlt: `demo.meta.titleAlt`,
    description: `demo.meta.description`,
    pathPrefix: `/`,
    articlePrefix: '/blog/',
    siteUrl: process.env.GATSBY_SITE_URL || `http://localhost:8000`,
    icon: `src/images/gatsby-icon.png`,
    iconName: 'gatsby-icon',
    keywords: [
        `gatby reapt`,
        `gatsby starter`,
        `gatsby intl`,
        `gatsby seo`,
        `gatsby gdpr`,
        `gatsby rgpd`,
        `mk-react-comp`,
    ],
    googleSiteVerification: process.env.GATSBY_GOOGLE_SITE_VERIFICATION || ``,
    // manifest config
    langs: {
        all: ['fr', 'en'],
        default: {
            lang: `fr`,
            name: `Gatsby Reapt`,
            short_name: `Gatsby Reapt`,
            description: `Un kit de démarrage Gatsby avec i18n`,
        },
        others: [
            {
                lang: `en`,
                name: `Gatsby Reapt`,
                short_name: `Gatsby Reapt`,
                description: `A Gatsby Starter with i18n`,
                start_url: `/en/`,
            },
        ],
    },

    backgroundColor: `#e0e0e0`,
    themeColor: `#663399`,
};
