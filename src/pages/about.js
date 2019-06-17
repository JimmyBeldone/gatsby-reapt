/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import LocalizedLink from '../views/components/LocalizedLink';
import MainLayout from '../views/layouts/MainLayout';
import SEO from '../views/components/SEO';

const About = ({ pageContext: { locale }, location }) => {
    return (
        <MainLayout locale={locale} location={location}>
            <SEO title='demo.about.headerTitle' location={location} />
            <div className='container'>
                <h1>
                    <FormattedMessage id='demo.about.title' />
                </h1>
                <p>
                    <FormattedMessage id='demo.about.welcome' />
                </p>
                <LocalizedLink to='/'>
                    <FormattedMessage id='demo.about.link' />
                </LocalizedLink>
            </div>
        </MainLayout>
    );
};

About.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default About;
