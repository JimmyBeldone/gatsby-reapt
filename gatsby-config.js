const styleResources = require("./src/styles/styleConfig");
// const languages = require("./src/lang");

module.exports = {
    siteMetadata: {
        title: `demo.meta.title`,
        description: `demo.meta.description`,
        author: `demo.meta.author`
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        // `gatsby-plugin-typography`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`
            }
        },
        {
            resolve: "gatsby-plugin-stylus-resources",
            options: {
                resources: styleResources
            }
        },
        "gatsby-plugin-eslint",
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
            }
        },
        "gatsby-plugin-offline",
        "gatsby-plugin-webpack-bundle-analyser-v2"
    ]
};
