// export const getSchemaOrgJSONLD = ({
//     isBlogPost,
//     url,
//     title,
//     image,
//     description,
//     datePublished,
// }) => {
//     const schemaOrgJSONLD = [
//         {
//             '@context': 'http://schema.org',
//             '@type': 'WebSite',
//             url,
//             name: title,
//             alternateName: config.title,
//         },
//     ];

//     return isBlogPost
//         ? [
//               ...schemaOrgJSONLD,
//               {
//                   '@context': 'https://khalilstemmler.com',
//                   '@type': 'BreadcrumbList',
//                   itemListElement: [
//                       {
//                           '@type': 'ListItem',
//                           position: 1,
//                           item: {
//                               '@id': url,
//                               name: title,
//                               image,
//                           },
//                       },
//                   ],
//               },
//               {
//                   '@context': 'https://khalilstemmler.com',
//                   '@type': 'BlogPosting',
//                   url,
//                   name: title,
//                   alternateName: config.title,
//                   headline: title,
//                   image: {
//                       '@type': 'ImageObject',
//                       url: image,
//                   },
//                   description,
//                   author: {
//                       '@type': 'Person',
//                       name: 'Khalil Stemmler',
//                   },
//                   publisher: {
//                       '@type': 'Organization',
//                       url: 'https://khalilstemmler.com',
//                       logo: config.logo,
//                       name: 'Khalil Stemmler',
//                   },
//                   mainEntityOfPage: {
//                       '@type': 'WebSite',
//                       '@id': config.url,
//                   },
//                   datePublished,
//               },
//           ]
//         : schemaOrgJSONLD;
// };

// const test = [
//     {
//         '@context': 'http://schema.org',
//         '@type': 'WebSite',
//         url: 'https://lengstorf.com/creativity-and-editing/',
//         name: 'The Ugly Other Half of Creativity\n',
//         alternateName:
//             'Jason Lengstorf · There’s more to life than hustle & grind.',
//     },
//     {
//         '@context': 'http://schema.org',
//         '@type': 'BreadcrumbList',
//         itemListElement: [
//             {
//                 '@type': 'ListItem',
//                 position: 1,
//                 item: {
//                     '@id': 'https://lengstorf.com/creativity-and-editing/',
//                     name: 'The Ugly Other Half of Creativity\n',
//                     image:
//                         'https://lengstorf.com/static/86c07422b0c4f67e722327f5e91e1856/c108b/editing.jpg',
//                 },
//             },
//         ],
//     },
//     {
//         '@context': 'http://schema.org',
//         '@type': 'BlogPosting',
//         url: 'https://lengstorf.com/creativity-and-editing/',
//         name: 'The Ugly Other Half of Creativity\n',
//         alternateName:
//             'Jason Lengstorf · There’s more to life than hustle & grind.',
//         headline: 'The Ugly Other Half of Creativity\n',
//         image: {
//             '@type': 'ImageObject',
//             url:
//                 'https://lengstorf.com/static/86c07422b0c4f67e722327f5e91e1856/c108b/editing.jpg',
//         },
//         description:
//             'If we hope to turn our Big Ideas™ into meaningful progress, we need to become ruthless, murderous editors.\n',
//         author: { '@type': 'Person', name: 'Jason Lengstorf' },
//         publisher: {
//             '@type': 'Organization',
//             url: 'https://lengstorf.com',
//             logo: 'https://lengstorf.com/android-chrome-512x512.png',
//             name: 'Jason Lengstorf',
//         },
//         mainEntityOfPage: {
//             '@type': 'WebSite',
//             '@id': 'https://lengstorf.com',
//         },
//         datePublished: '2019-08-19T00:00:00+00:00',
//     },
// ];

// const blogPost = {
//     '@context': 'http:\u002F\u002Fschema.org',
//     '@type': 'NewsArticle',
//     image: [
//         'https:\u002F\u002Fmiro.medium.com\u002Fmax\u002F1200\u002F1*tp93qiY6ntxy5m_43VpRUw.jpeg',
//     ],
//     url:
//         'https:\u002F\u002Fmedium.com\u002Fdailyjs\u002Fthe-top-12-react-links-of-2018-eea4c11d35a0',
//     dateCreated: '2018-12-20T10:12:06.668Z',
//     datePublished: '2018-12-20T10:12:06.668Z',
//     dateModified: '2018-12-20T14:42:23.279Z',
//     headline: 'The top 12 React links of 2018',
//     name: 'The top 12 React links of 2018',
//     description:
//         'Each week over 25,000 React developers stay up-to-date with all best links, tutorials and tools from across the web in React Status — a free weekly digest bringing together the best of the past 7…',
//     identifier: 'eea4c11d35a0',
//     keywords: [
//         'Lite:true',
//         'Tag:React',
//         'Tag:JavaScript',
//         'Tag:Redux',
//         'Tag:React Native',
//         'Tag:Create React App',
//         'Publication:dailyjs',
//         'Elevated:false',
//         'LockedPostSource:LOCKED_POST_SOURCE_NONE',
//         'LayerCake:4',
//     ],
//     author: {
//         '@type': 'Person',
//         name: 'Chris Brandrick',
//         url: 'https:\u002F\u002Fmedium.com\u002F@chrisbrandrick',
//     },
//     creator: ['Chris Brandrick'],
//     publisher: {
//         '@type': 'Organization',
//         name: 'DailyJS',
//         url: 'https:\u002F\u002Fmedium.com\u002Fdailyjs',
//         logo: {
//             '@type': 'ImageObject',
//             width: 192,
//             height: 60,
//             url:
//                 'https:\u002F\u002Fmiro.medium.com\u002Fmax\u002F384\u002F1*6xZcnSJBsfj31-_FC86kyQ.png',
//         },
//     },
//     mainEntityOfPage:
//         'https:\u002F\u002Fmedium.com\u002Fdailyjs\u002Fthe-top-12-react-links-of-2018-eea4c11d35a0',
// };

// const product = {
//     '@context': 'http://schema.org/',
//     '@type': 'Product',
//     name: 'Smartphone Samsung Galaxy A10 Double SIM 32 Go Noir',
//     image:
//         'https://static.fnac-static.com/multimedia/Images/FR/MDM/23/47/b3/11749155/1540-1.jpg',
//     gtin13: '8806090148446',
//     sku: '9144381',
//     url:
//         'https://www.fnac.com/Smartphone-Samsung-Galaxy-A10-Double-SIM-32-Go-Noir/a13528640/w-4',
//     mainEntityOfPage:
//         'https://www.fnac.com/Smartphone-Samsung-Galaxy-A10-Double-SIM-32-Go-Noir/a13528640/w-4',
//     aggregateRating: {
//         '@type': 'AggregateRating',
//         ratingValue: 4.5,
//         ratingCount: 141,
//     },
//     offers: {
//         '@type': 'Offer',
//         priceCurrency: 'EUR',
//         price: 159.0,
//         availability: 'http://schema.org/InStock',
//         itemCondition: 'http://schema.org/NewCondition',
//         seller: { '@type': 'Organization', name: 'FNAC.COM' },
//     },
//     brand: {
//         '@type': 'Brand',
//         name: 'Samsung',
//         url: 'https://www.fnac.com/Samsung/m55616/w-4',
//     },
// };
