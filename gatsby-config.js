const styleResources = require(`./src/styles/styleConfig`);
const metaConfig = require(`./gatsby-meta-config`);

const activeEnv = process.env.MODE || process.env.NODE_ENV || `development`;
console.log(`Using environment config: '${activeEnv}'`);

// eslint-disable-next-line import/no-extraneous-dependencies
require(`dotenv`).config({
    path: `.env.${activeEnv}`,
});

module.exports = {
    siteMetadata: metaConfig,
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-react-helmet-canonical-urls`,
            options: {
                siteUrl: metaConfig.siteUrl,
            },
        },
        {
            resolve: `gatsby-plugin-eslint`,
            options: {
                test: /\.js$|\.jsx$/,
                exclude: /(node_modules|.cache|public)/,
                stages: [`develop`],
                options: {
                    emitWarning: true,
                    failOnError: false,
                },
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
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-netlify`,
        `gatsby-plugin-advanced-sitemap`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: metaConfig.icon,
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
