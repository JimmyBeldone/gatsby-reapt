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
        creator: author.networks.twitter,
        site: business.networks.twitter,
    };

    return [
        {
            content: options.cardType || defaultValue.card,
            name: `twitter:card`,
        },
        {
            content: title,
            name: `twitter:title`,
        },
        {
            content: description,
            name: `twitter:description`,
        },
        {
            content: image,
            name: `twitter:image`,
        },
        {
            content: imageAlt,
            name: 'twitter:image:alt',
        },
        {
            content: options.site || defaultValue.site,
            name: `twitter:site`,
        },
        {
            content: options.creator || defaultValue.creator,
            name: `twitter:creator`,
        },
    ];
};

export default getTwitterMeta;
