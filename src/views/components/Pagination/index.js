import React from 'react';
import PropTypes from 'prop-types';

import { getUrlLangPrefix } from '../../../utils/i18n';

const Pagination = ({ numPages, currentPage, contextPage, lang }) => {
    if (numPages <= 1) {
        return null;
    }

    return (
        <ul>
            {Array.from({ length: numPages }).map((item, i) => {
                const index = i + 1;
                const path = getUrlLangPrefix(lang, contextPage);
                const link = index === 1 ? path : `${path}page/${index}`;

                return currentPage === index ? (
                    <li key={link}>{index}</li>
                ) : (
                    <li key={link}>
                        <a href={link}>{index}</a>
                    </li>
                );
            })}
        </ul>
    );
};

Pagination.propTypes = {
    numPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    contextPage: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
};

export default Pagination;
