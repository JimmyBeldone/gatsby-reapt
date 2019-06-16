/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import LocalizedLink from '../views/components/LocalizedLink';
import MainLayout from '../views/layouts/MainLayout';
import SEO from '../views/components/SEO';

const SecondPage = ({ pageContext: { locale }, location, ...props }) => {
    console.log(location);
    console.log(props);
    return (
        <MainLayout locale={locale} location={location}>
            <SEO title="demo.page2.headerTitle" />
            <h1>
                <FormattedMessage id="demo.page2.hello" />
            </h1>
            <p>
                <FormattedMessage id="demo.page2.welcome" />
            </p>
            <LocalizedLink to="/">
                <FormattedMessage id="demo.page2.link" />
            </LocalizedLink>
        </MainLayout>
    );
};

SecondPage.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default SecondPage;
