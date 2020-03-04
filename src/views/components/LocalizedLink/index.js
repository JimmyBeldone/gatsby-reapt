import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';

import { PAGE_HOME } from '../../../constants/router';
import { getSlug, resolvePageUrl, getUrlLangPrefix } from '../../../utils/i18n';

const LocalizedLink = ({ to, intl: { locale }, hasSlug, ...props }) => {
    const path = hasSlug
        ? getSlug(to, locale)
        : resolvePageUrl(getUrlLangPrefix(locale, to));
    return (
        <Link
            {...props}
            to={path}
            activeClassName='active-link'
            partiallyActive={to !== PAGE_HOME}
        />
    );
};

LocalizedLink.defaultProps = {
    hasSlug: false,
};

LocalizedLink.propTypes = {
    to: PropTypes.string.isRequired,
    hasSlug: PropTypes.bool,
};

export default injectIntl(LocalizedLink);
