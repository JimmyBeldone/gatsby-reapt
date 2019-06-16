import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import MainLayout from '../views/layouts/MainLayout';
import Image from '../views/components/Images';
import SEO from '../views/components/SEO';
import LocalizedLink from '../views/components/LocalizedLink';

import test from '../images/gatsby-astronaut.png';

const IndexPage = ({ pageContext: { locale }, location }) => (
    <MainLayout locale={locale} location={location}>
        <SEO
            title='demo.home.headerTitle'
            keywords={[`gatsby`, `application`, `react`]}
            metaIcon={test}
            location={location}
        />
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
    </MainLayout>
);

IndexPage.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default IndexPage;
