import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import MainLayout from '../views/layouts/MainLayout';
import Image from '../views/components/Images';
import SEO from '../views/components/SEO';
import LocalizedLink from '../views/components/LocalizedLink';

const IndexPage = ({ pageContext: { locale }, location }) => (
    <MainLayout locale={locale} location={location}>
        <SEO title='demo.home.headerTitle' location={location} />
        <div className='container'>
            <h1>
                <FormattedMessage id='demo.home.hello' />
            </h1>
            <p>
                <FormattedMessage id='demo.home.welcome' />
            </p>
            <p>
                <FormattedMessage id='demo.home.now' />
            </p>
            <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
                <Image />
            </div>
            <LocalizedLink to='/page-2/'>
                <FormattedMessage id='demo.home.link' />
            </LocalizedLink>
        </div>
    </MainLayout>
);

IndexPage.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default IndexPage;
