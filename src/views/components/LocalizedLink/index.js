import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';

import { PAGE_HOME } from '../../../constants/router';
import { getSlug, resolvePageUrl, getUrlLangPrefix } from '../../../utils/i18n';

const LocalizedLink = ({ hasSlug, intl: { locale }, to, ...props }) => {
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
    hasSlug: PropTypes.bool,
    intl: PropTypes.object.isRequired,
    to: PropTypes.string.isRequired,
};

export default injectIntl(LocalizedLink);
