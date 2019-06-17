const activeEnv = process.env.MODE || process.env.NODE_ENV || `development`;

// eslint-disable-next-line import/no-extraneous-dependencies
require(`dotenv`).config({
    path: `.env.${activeEnv}`,
});

module.exports = {
    title: `demo.meta.title`,
    description: `demo.meta.description`,
    author: `Jimmy Beldone`,
    siteUrl: process.env.SITE_URL || `http://localhost:8000`,
    social: {
        twitter: ``,
        github: ``,
    },
    icon: `src/images/gatsby-icon.png`,
    keywords: [`reapt`],
    ga: ``,
};
