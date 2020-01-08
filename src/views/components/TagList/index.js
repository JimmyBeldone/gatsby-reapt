import React from 'react';
import PropTypes from 'prop-types';

import LocalizedLink from '../LocalizedLink';

const kebabCase = require('lodash.kebabcase');

const TagList = ({ tags }) => (
    <div>
        {tags
            .filter((tag, index) => index === tags.indexOf(tag)) // Remove duplicate values
            .sort()
            .map(tag => (
                <LocalizedLink to={`/tags/${kebabCase(tag)}/`} key={tag}>
                    {tag}
                </LocalizedLink>
            ))}
    </div>
);

TagList.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagList;
