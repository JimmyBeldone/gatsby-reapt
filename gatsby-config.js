const styleResources = require(`./src/styles/styleConfig`);
const config = require(`./config/siteConfig`);
const { selectSlug } = require(`./src/utils/i18n`);

const activeEnv = process.env.MODE || process.env.NODE_ENV || `development`;
console.log(`Using environment config: '${activeEnv}'`);

// eslint-disable-next-line import/no-extraneous-dependencies
require(`dotenv`).config({
    path: `.env.${activeEnv}`,
});

const defaultQueries = {
    l: '(max-width: 1536px)',
    md: '(max-width: 1024px)',
    sm: '(max-width: 720px)',
    xs: '(max-width: 320px)',
};

module.exports = {
    plugins: [
        'gatsby-plugin-eslint',
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-react-helmet-async`,
        // {
        //     resolve: `gatsby-plugin-react-helmet-canonical-urls`,
        //     options: {
        //         siteUrl: config.siteUrl,
        //     },
        // },
        {
            options: {
                queries: defaultQueries,
            },
            resolve: 'gatsby-plugin-breakpoints',
        },
        {
            options: {
                pathToConfigModule: `config/typography.js`,
            },
            resolve: `gatsby-plugin-typography`,
        },
        {
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
            resolve: `gatsby-source-filesystem`,
        },
        {
            options: {
                name: `posts`,
                path: `${__dirname}/content${config.articlePrefix}`,
            },
            resolve: `gatsby-source-filesystem`,
        },
        {
            options: {
                name: `products`,
                path: `${__dirname}/content/products`,
            },
            resolve: `gatsby-source-filesystem`,
        },
        {
            options: {
                resources: styleResources,
            },
            resolve: `gatsby-plugin-stylus-resources`,
        },
        {
            options: {
                color: `tomato`,
                showSpinner: false,
            },
            resolve: `gatsby-plugin-nprogress`,
        },
        `gatsby-transformer-sharp`,
        {
            options: {
                extensions: [`.mdx`, `.md`],
                gatsbyRemarkPlugins: [
                    // {
                    //     resolve: `gatsby-remark-images`,
                    //     options: {
                    //         maxWidth: 1035,
                    //     },
                    // },
                    {
                        options: {
                            rel: 'noreferrer noopener',
                            target: '_blank',
                        },
                        resolve: 'gatsby-remark-external-links',
                    },
                ],
            },
            resolve: `gatsby-plugin-mdx`,
        },
        // {
        //     resolve: 'gatsby-schema-field-absolute-path',
        //     options: {
        //         // or c. object with named field extension
        //         dirs: {
        //             'content/assets': 'fileByAssetPath',
        //             'src/images': 'fileByImagePath',
        //         },
        //     },
        // },
        'gatsby-schema-field-absolute-path',
        `gatsby-plugin-sharp`,
        `gatsby-plugin-netlify`,
        {
            options: {
                query: `{
                    site {
                        siteMetadata {
                            siteUrl
                        }
                    }
                    allSitePage {
                        edges {
                            node {
                                path
                                context {
                                    translations {
                                        link
                                        langKey
                                    }
                                }
                            }
                        }
                    }
                }`,
                serialize: ({ allSitePage, site }) =>
                    allSitePage.edges.map((edge) => {
                        const { context } = edge.node;
                        const baseUrl = site.siteMetadata.siteUrl;

                        const linksLangs = config.langs.all.map((lang) => ({
                            lang,
                            url: selectSlug(baseUrl, context, lang),
                        }));

                        const defaultLink = {
                            lang: 'x-default',
                            url: selectSlug(
                                baseUrl,
                                context,
                                config.langs.default.lang,
                            ),
                        };

                        return {
                            changefreq: 'daily',
                            links: [...linksLangs, defaultLink],
                            priority: 0.7,
                            url: `${baseUrl}${edge.node.path}`,
                        };
                    }),
            },
            resolve: `gatsby-plugin-sitemap`,
        },
        {
            options: {
                background_color: config.backgroundColor,
                cache_busting_mode: 'none',
                description: config.langs.default.description,
                display: `minimal-ui`,
                icon: config.icon,
                icons: [
                    {
                        sizes: `48x48`,
                        src: `/favicons/icon-48x48.png`,
                        type: `image/png`,
                    },
                    {
                        sizes: `72x72`,
                        src: `/favicons/icon-72x72.png`,
                        type: `image/png`,
                    },
                    {
                        sizes: `96x96`,
                        src: `/favicons/icon-96x96.png`,
                        type: `image/png`,
                    },
                    {
                        sizes: `144x144`,
                        src: `/favicons/icon-144x144.png`,
                        type: `image/png`,
                    },
                    {
                        sizes: `192x192`,
                        src: `/favicons/icon-192x192.png`,
                        type: `image/png`,
                    },
                    {
                        sizes: `256x256`,
                        src: `/favicons/icon-256x256.png`,
                        type: `image/png`,
                    },
                    {
                        sizes: `384x384`,
                        src: `/favicons/icon-384x384.png`,
                        type: `image/png`,
                    },
                    {
                        sizes: `512x512`,
                        src: `/favicons/icon-512x512.png`,
                        type: `image/png`,
                    },
                ],
                lang: config.langs.default.lang,
                localize: config.langs.others,
                name: config.langs.default.name,
                short_name: config.langs.default.short_name,
                start_url: config.pathPrefix,
                theme_color: config.themeColor,
            },
            resolve: `gatsby-plugin-manifest`,
        },
        {
            options: {
                env: {
                    development: {
                        policy: [{ disallow: [`/`], userAgent: `*` }],
                    },
                    production: {
                        policy: [{ allow: `/`, userAgent: `*` }],
                    },
                    staging: {
                        policy: [{ allow: `/`, userAgent: `*` }],
                    },
                },
                resolveEnv: () => activeEnv,
            },
            resolve: `gatsby-plugin-robots-txt`,
        },
        {
            options: {
                fields: [
                    { attributes: { boost: 20 }, name: 'title', store: true },
                    {
                        attributes: { boost: 10 },
                        name: 'description',
                        store: true,
                    },
                    { attributes: { boost: 10 }, name: 'content', store: true },
                    { name: 'url', store: true },
                    { attributes: { boost: 5 }, name: 'tags', store: true },
                ],
                filename: 'search_index.json',
                languages: [
                    {
                        filterNodes: (node) =>
                            node.frontmatter !== null &&
                            node.frontmatter !== undefined &&
                            node.frontmatter.lang === 'fr',
                        name: 'fr',
                    },
                    {
                        filterNodes: (node) =>
                            node.frontmatter !== null &&
                            node.frontmatter !== undefined &&
                            node.frontmatter.lang === 'en',
                        name: 'en',
                    },
                ],
                resolvers: {
                    Mdx: {
                        content: (node) => node.body,
                        description: (node) => node.frontmatter.description,
                        tags: (node) => node.frontmatter.tags,
                        title: (node) => node.frontmatter.title,
                        url: (node) => node.frontmatter.path,
                    },
                },
            },
            resolve: 'gatsby-plugin-lunr',
        },
        {
            options: {
                cacheId: `gatsby-plugin-offline`,
                clientsClaim: true,
                directoryIndex: 'index.html',
                globDirectory: 'public',
                importWorkboxFrom: `local`,
                navigateFallbackWhitelist: [/\/$/],
                precachePages: [`/`],
                skipWaiting: true,
                workboxConfig: {
                    globPatterns: [
                        // '**/*',
                        '**/*.{js,jpg,jpeg,png,svg,webp,html,css,json,map,xml,ttf,woff,woff2}',
                    ],
                },
            },
            resolve: `gatsby-plugin-offline`,
        },
        `gatsby-plugin-webpack-bundle-analyser-v2`,
    ],
    siteMetadata: config,
};
