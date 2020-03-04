import siteConfig from '../../../../config/siteConfig';
import socialConfig from '../../../../config/socialConfig';

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
            property: `og:title`,
            content: title,
        },
        {
            property: `og:description`,
            content: description,
        },
        {
            property: `og:image`,
            content: image,
        },
        {
            property: `og:image:secure_url`,
            content: image,
        },
        {
            property: 'og:image:alt',
            content: imageAlt,
        },
        {
            property: `og:url`,
            content: url,
        },
        {
            property: `og:site_name`,
            content: siteConfig.name,
        },
        {
            property: `og:locale`,
            content: locale,
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

const setWebsite = () => [
    {
        property: `og:type`,
        content: 'website',
    },
];

const setArticle = ({ category, publishedAt, updatedAt, tags, author }) => {
    return [
        {
            property: `og:type`,
            content: 'article',
        },
        {
            name: 'article:section',
            content: category,
        },
        {
            name: 'article:published_time',
            content: publishedAt,
        },
        {
            name: 'article:modified_time',
            content: updatedAt,
        },
        {
            name: 'article:tag',
            content: tags.join(', '),
        },
        {
            name: 'article:author',
            content: author || socialConfig.author.networks.github, // url with existing og:profile on page
        },
    ];
};

const setBusiness = () => {
    const { business } = socialConfig.business;
    return [
        {
            property: `og:type`,
            content: 'business.business',
        },
        {
            property: 'business:contact_data:street_address',
            content: business.street_address,
        },
        {
            property: 'business:contact_data:locality',
            content: business.locality,
        },
        {
            property: 'business:contact_data:region',
            content: business.region,
        },
        {
            property: 'business:contact_data:postal_code',
            content: business.postal_code,
        },
        {
            property: 'business:contact_data:country_name',
            content: business.country,
        },
    ];
};

const setProductGroup = () => {
    return [
        {
            property: `og:type`,
            content: 'product.group',
        },
    ];
};

const setProductItem = ({
    brand,
    condition = null,
    availability = null,
    price = null,
    currency = null,
}) => {
    const meta = [
        {
            property: `og:type`,
            content: 'product',
        },
        {
            property: 'product:condition',
            content: condition || 'new',
        },
        {
            property: 'product:availability',
            content: availability || 'instock',
        },

        {
            property: 'product:brand',
            content: brand,
        },
    ];
    if (price) {
        const priceArray = [
            {
                property: 'product:price:amount',
                content: price,
            },
            {
                property: 'product:price:currency',
                content: currency,
            },
        ];
        meta.concat(priceArray);
    }
    return meta;
};

export default getOpenGraphMeta;
