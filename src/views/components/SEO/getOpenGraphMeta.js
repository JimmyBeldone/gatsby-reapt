import siteConfig from '../../../../config/siteConfig';
import socialConfig from '../../../../config/socialConfig';

const setWebsite = () => [
    {
        content: 'website',
        property: `og:type`,
    },
];

const setArticle = ({ author, category, publishedAt, tags, updatedAt }) => {
    return [
        {
            content: 'article',
            property: `og:type`,
        },
        {
            content: category,
            name: 'article:section',
        },
        {
            content: publishedAt,
            name: 'article:published_time',
        },
        {
            content: updatedAt,
            name: 'article:modified_time',
        },
        {
            content: tags.join(', '),
            name: 'article:tag',
        },
        {
            content: author || socialConfig.author.networks.github,
            name: 'article:author', // url with existing og:profile on page
        },
    ];
};

const setBusiness = () => {
    const { business } = socialConfig.business;
    return [
        {
            content: 'business.business',
            property: `og:type`,
        },
        {
            content: business.street_address,
            property: 'business:contact_data:street_address',
        },
        {
            content: business.locality,
            property: 'business:contact_data:locality',
        },
        {
            content: business.region,
            property: 'business:contact_data:region',
        },
        {
            content: business.postal_code,
            property: 'business:contact_data:postal_code',
        },
        {
            content: business.country,
            property: 'business:contact_data:country_name',
        },
    ];
};

const setProductGroup = () => {
    return [
        {
            content: 'product.group',
            property: `og:type`,
        },
    ];
};

const setProductItem = ({
    availability = null,
    brand,
    condition = null,
    currency = null,
    price = null,
}) => {
    const meta = [
        {
            content: 'product',
            property: `og:type`,
        },
        {
            content: condition || 'new',
            property: 'product:condition',
        },
        {
            content: availability || 'instock',
            property: 'product:availability',
        },

        {
            content: brand,
            property: 'product:brand',
        },
    ];
    if (price) {
        const priceArray = [
            {
                content: price,
                property: 'product:price:amount',
            },
            {
                content: currency,
                property: 'product:price:currency',
            },
        ];
        meta.concat(priceArray);
    }
    return meta;
};

const getOpenGraphMeta = (
    title,
    description,
    image,
    imageAlt,
    contentType,
    url,
    locale,
    article = null,
    product = null,
) => {
    const meta = [
        {
            content: title,
            property: `og:title`,
        },
        {
            content: description,
            property: `og:description`,
        },
        {
            content: image,
            property: `og:image`,
        },
        {
            content: image,
            property: `og:image:secure_url`,
        },
        {
            content: imageAlt,
            property: 'og:image:alt',
        },
        {
            content: url,
            property: `og:url`,
        },
        {
            content: siteConfig.name,
            property: `og:site_name`,
        },
        {
            content: locale,
            property: `og:locale`,
        },
    ];

    let otherMeta = [];

    switch (contentType) {
        case 'website':
            otherMeta = setWebsite();
            break;
        case 'article':
            if (article === null) {
                console.error('SEO Component: the prop "post" is missing');
            }
            otherMeta = setArticle(article);
            break;
        case 'product':
            if (product === null) {
                console.error('SEO Component: the prop "product" is missing');
            }
            otherMeta = setProductItem(product);
            break;
        case 'product:group':
            otherMeta = setProductGroup();
            break;
        case 'business':
            otherMeta = setBusiness();
            break;
        default:
            break;
    }

    return meta.concat(otherMeta);
};

export default getOpenGraphMeta;
