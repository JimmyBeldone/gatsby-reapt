import siteConfig from '../../../../config/siteConfig';
import { author, business } from '../../../../config/socialConfig';

const getJsonLd = (
    title,
    description,
    image,
    imageAlt,
    contentType,
    url,
    lang,
    post = null,
    product = null,
    logo,
    titleAlt,
) => {
    const schemaOrgJSONLD = {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url,
        name: title,
        alternateName: titleAlt,
    };

    if (contentType !== 'article') {
        return schemaOrgJSONLD;
    } else {
        const article =
            // {
            //     '@context': 'https://khalilstemmler.com',
            //     '@type': 'BreadcrumbList',
            //     itemListElement: [
            //         {
            //             '@type': 'ListItem',
            //             position: 1,
            //             item: {
            //                 '@id': url,
            //                 name: title,
            //                 image,
            //             },
            //         },
            //     ],
            // },
            {
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: title,
                url,
                alternateName: titleAlt,
                image: {
                    '@type': 'ImageObject',
                    url: image,
                    name: imageAlt,
                },
                description,
                author: {
                    '@type': 'Person',
                    name: author.username,
                },
                publisher: {
                    '@type': 'Organization',
                    url: business.url,
                    logo: siteConfig.siteUrl + logo,
                    name: business.title,
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': siteConfig.siteUrl + siteConfig.articlePrefix,
                },
                datePublished: post.publishedAt,
                dateModified: post.updatedAt,
                articleBody: post.body,
                articleSection: post.category,
            };
        return article;
    }
};

export default getJsonLd;
