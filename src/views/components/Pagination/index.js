import PropTypes from 'prop-types';
import React from 'react';

import { getUrlLangPrefix } from '../../../utils/i18n';

const Pagination = ({ contextPage, currentPage, lang, numPages }) => {
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
    contextPage: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    lang: PropTypes.string.isRequired,
    numPages: PropTypes.number.isRequired,
};

export default Pagination;
