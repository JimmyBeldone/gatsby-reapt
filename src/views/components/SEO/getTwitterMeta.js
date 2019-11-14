import { author, business } from '../../../../config/socialConfig';

/**
 * Get Twitter card meta
 *
 * @param {string} title
 * @param {string} description
 * @param {string} image
 * @param {string} imageAlt test
 * @param {Object} [options.site=null] - Organisation Twitter page
 * @param {Object} [options.creator] - Author Twitter page
 * @param {Object} [options.cardType=summary] - Twitter Card type (default: 'summary')
 * @returns {array} Array of meta tags
 */
const getTwitterMeta = (title, description, image, imageAlt, options = {}) => {
    const defaultValue = {
        card: `summary`,
        site: business.networks.twitter,
        creator: author.networks.twitter,
    };

    return [
        {
            name: `twitter:card`,
            content: options.cardType || defaultValue.card,
        },
        {
            name: `twitter:title`,
            content: title,
        },
        {
            name: `twitter:description`,
            content: description,
        },
        {
            name: `twitter:image`,
            content: image,
        },
        {
            name: 'twitter:image:alt',
            content: imageAlt,
        },
        {
            name: `twitter:site`,
            content: options.site || defaultValue.site,
        },
        {
            name: `twitter:creator`,
            content: options.creator || defaultValue.creator,
        },
    ];
};

export default getTwitterMeta;
