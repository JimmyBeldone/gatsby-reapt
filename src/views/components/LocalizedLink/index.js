import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import locales from '../../../constants/locales';
import { PAGE_HOME } from '../../../constants/router';

const LocalizedLink = ({ to, intl: { locale }, ...props }) => {
    // eslint-disable-next-line security/detect-object-injection
    const path = locales[locale].default ? to : `/${locale}${to}`;

    return (
        <Link
            {...props}
            to={path}
            activeClassName={'active-link'}
            partiallyActive={to !== PAGE_HOME}
        />
    );
};

LocalizedLink.propTypes = {
    to: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
};

export default injectIntl(LocalizedLink);
