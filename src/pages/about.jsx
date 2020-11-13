/* eslint-disable react/jsx-pascal-case */
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import LocalizedLink from '../views/components/LocalizedLink';
import SEO from '../views/components/SEO';
import MainLayout from '../views/layouts/MainLayout';

const About = ({ location, pageContext: { locale, translations } }) => {
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
    location: PropTypes.object.isRequired,
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        translations: PropTypes.array.isRequired,
    }).isRequired,
};

export default About;
