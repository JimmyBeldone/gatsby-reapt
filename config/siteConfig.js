const activeEnv = process.env.MODE || process.env.NODE_ENV || `development`;

// eslint-disable-next-line import/no-extraneous-dependencies
require(`dotenv`).config({
    path: `.env.${activeEnv}`,
});

module.exports = {
    // SEO
    title: `demo.meta.title`,
    description: `demo.meta.description`,
    pathPrefix: `/`,
    siteUrl: process.env.SITE_URL || `http://localhost:8000`,
    icon: `src/images/gatsby-icon.png`,
    keywords: [
        `gatby reapt`,
        `gatsby starter`,
        `gatsby intl`,
        `gatsby seo`,
        `mk-react-comp`,
    ],
    // manifest config
    name: `gatsby-reapt`,
    short_name: `Gatsby Reapt`,
    backgroundColor: `#e0e0e0`,
    themeColor: `#663399`,
    // Social
    social: {
        github: `https://github.com/JimmyBeldone/gatsby-reapt/`,
        twitter: ``,
    },
    // Author
    author: {
        name: `Jimmy Beldone`,
        email: `dev.jimmy.beldone@gmail.com`,
        location: `Lyon, France`,
        avatar: ``,
        description: ``,
        social: {
            twitter: ``,
            github: `https://github.com/JimmyBeldone/`,
        },
    },
    copyright: `Copyright © ${new Date().getFullYear()} - Gatsby Reapt - Jimmy Beldone`,
};
