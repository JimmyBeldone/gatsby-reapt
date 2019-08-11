import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { getSlug } from '../../../utils/slugs';
import { PAGE_HOME } from '../../../constants/router';

const LocalizedLink = ({ to, intl: { locale }, ...props }) => (
    <Link
        {...props}
        to={getSlug(to, locale)}
        activeClassName={`active-link`}
        partiallyActive={to !== PAGE_HOME}
    />
);

LocalizedLink.propTypes = {
    to: PropTypes.string.isRequired,
};

export default injectIntl(LocalizedLink);
