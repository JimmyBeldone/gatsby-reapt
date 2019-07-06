const styleResources = require(`./src/styles/styleConfig`);
const config = require(`./config/siteConfig`);

const activeEnv = process.env.MODE || process.env.NODE_ENV || `development`;
console.log(`Using environment config: '${activeEnv}'`);

// eslint-disable-next-line import/no-extraneous-dependencies
require(`dotenv`).config({
    path: `.env.${activeEnv}`,
});

module.exports = {
    siteMetadata: config,
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-react-helmet-canonical-urls`,
            options: {
                siteUrl: config.siteUrl,
            },
        },
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `config/typography.js`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/images`,
                name: `images`,
            },
        },
        {
            resolve: `gatsby-plugin-stylus-resources`,
            options: {
                resources: styleResources,
            },
        },
        {
            resolve: `gatsby-plugin-nprogress`,
            options: {
                color: `tomato`,
                showSpinner: false,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-netlify`,
        `gatsby-plugin-advanced-sitemap`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: config.langs.default.name,
                short_name: config.langs.default.short_name,
                description: config.langs.default.description,
                lang: config.langs.default.lang,
                start_url: config.pathPrefix,
                background_color: config.backgroundColor,
                theme_color: config.theme_color,
                display: `minimal-ui`,
                icon: config.icon,
                localize: config.langs.others,
                icons: [
                    {
                        src: `/favicons/icon-48x48.png`,
                        sizes: `48x48`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicons/icon-72x72.png`,
                        sizes: `72x72`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicons/icon-96x96.png`,
                        sizes: `96x96`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicons/icon-144x144.png`,
                        sizes: `144x144`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicons/icon-192x192.png`,
                        sizes: `192x192`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicons/icon-256x256.png`,
                        sizes: `256x256`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicons/icon-384x384.png`,
                        sizes: `384x384`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicons/icon-512x512.png`,
                        sizes: `512x512`,
                        type: `image/png`,
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-robots-txt`,
            options: {
                resolveEnv: () => activeEnv,
                env: {
                    development: {
                        policy: [{ userAgent: `*`, disallow: [`/`] }],
                    },
                    staging: {
                        policy: [{ userAgent: `*`, allow: `/` }],
                    },
                    production: {
                        policy: [{ userAgent: `*`, allow: `/` }],
                    },
                },
            },
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-webpack-bundle-analyser-v2`,
    ],
};
