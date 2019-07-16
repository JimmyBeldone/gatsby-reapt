/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import LocalizedLink from '../views/components/LocalizedLink';
import MainLayout from '../views/layouts/MainLayout';
import SEO from '../views/components/SEO';

const SecondPage = ({ pageContext: { locale, originalPath }, location }) => (
    <MainLayout locale={locale} originalPath={originalPath}>
        <SEO
            title='demo.page2.headerTitle'
            location={location}
            description='demo.page2.description'
        />
        <div className='container'>
            <h1>
                <FormattedMessage id='demo.page2.hello' />
            </h1>
            <p>
                <FormattedMessage id='demo.page2.welcome' />
            </p>
            <LocalizedLink to='/'>
                <FormattedMessage id='demo.page2.link' />
            </LocalizedLink>
        </div>
    </MainLayout>
);

SecondPage.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        originalPath: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default SecondPage;
