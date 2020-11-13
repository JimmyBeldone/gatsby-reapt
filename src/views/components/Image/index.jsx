import Img from 'gatsby-image/withIEPolyfill';
import kebabCase from 'lodash.kebabcase';
import PropTypes from 'prop-types';
import React from 'react';

import { ALT_TEXT_PREFIX } from '../../../constants/global';

const Image = ({ alt, ...props }) => {
    // Format string to match <img /> alt best practices
    const altify = (string) => ALT_TEXT_PREFIX + kebabCase(string);

    return <Img alt={altify(alt)} {...props} />;
};

Image.propTypes = {
    alt: PropTypes.string.isRequired,
};

export default Image;
