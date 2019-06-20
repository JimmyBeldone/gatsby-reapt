const activeEnv = process.env.MODE || process.env.NODE_ENV || `development`;

// eslint-disable-next-line import/no-extraneous-dependencies
require(`dotenv`).config({
    path: `.env.${activeEnv}`,
});

module.exports = {
    // SEO
    title: `demo.meta.title`,
    titleAlt: `demo.meta.titleAlt`,
    description: `demo.meta.description`,
    pathPrefix: `/`,
    siteUrl: process.env.GATSBY_SITE_URL || `http://localhost:8000`,
    icon: `src/images/gatsby-icon.png`,
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
    name: `Gatsby Reapt`,
    short_name: `Gatsby Reapt`,
    backgroundColor: `#e0e0e0`,
    themeColor: `#663399`,
    // Social
    social: {
        github: `https://github.com/JimmyBeldone/gatsby-reapt/`,
        twitter: ``,
    },
    // Author
    authorName: `Jimmy Beldone`,
    authorEmail: `dev.jimmy.beldone@gmail.com`,
    authorLocation: `Lyon, France`,
    authorAvatar: ``,
    authorDescription: ``,
    authorTwitter: `@jimmy_dev`,
    authorGithub: `https://github.com/JimmyBeldone/`,
    copyright: `Copyright © ${new Date().getFullYear()}`,
};
