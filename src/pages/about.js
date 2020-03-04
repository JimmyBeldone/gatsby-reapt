/* eslint-disable react/jsx-pascal-case */
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import LocalizedLink from '../views/components/LocalizedLink';
import SEO from '../views/components/SEO';
import MainLayout from '../views/layouts/MainLayout';

const About = ({ pageContext: { locale, translations }, location }) => {
    return (
        <MainLayout locale={locale} translationsPaths={translations}>
            <SEO
                title='demo.about.headerTitle'
                location={location}
                translationsPaths={translations}
                description='demo.about.description'
            />
            <div className='container'>
                <FormattedMessage id='demo.about.title' tagName='h1' />
                <FormattedMessage id='demo.about.welcome' tagName='p' />
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
        translations: PropTypes.array.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default About;
