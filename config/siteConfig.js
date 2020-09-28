const activeEnv = process.env.MODE || process.env.NODE_ENV || `development`;

// eslint-disable-next-line import/no-extraneous-dependencies
require(`dotenv`).config({
    path: `.env.${activeEnv}`,
});

module.exports = {
    articlePrefix: '/blog/',

    backgroundColor: `#e0e0e0`,

    description: `demo.meta.description`,

    googleSiteVerification: process.env.GATSBY_GOOGLE_SITE_VERIFICATION || ``,

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

    // manifest config
    langs: {
        all: ['fr', 'en'],
        default: {
            description: `Un kit de démarrage Gatsby avec i18n`,
            lang: `fr`,
            name: `Gatsby Reapt`,
            short_name: `Gatsby Reapt`,
        },
        others: [
            {
                description: `A Gatsby Starter with i18n`,
                lang: `en`,
                name: `Gatsby Reapt`,
                short_name: `Gatsby Reapt`,
                start_url: `/en/`,
            },
        ],
    },

    // SEO
    name: `Gatsby Reapt`,

    pathPrefix: `/`,

    siteUrl: process.env.GATSBY_SITE_URL || `http://localhost:8000`,

    themeColor: `#663399`,

    title: `demo.meta.title`,
    titleAlt: `demo.meta.titleAlt`,
};
