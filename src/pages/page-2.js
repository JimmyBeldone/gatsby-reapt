/* eslint-disable react/jsx-pascal-case */
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import LocalizedLink from '../views/components/LocalizedLink';
import SEO from '../views/components/SEO';
import MainLayout from '../views/layouts/MainLayout';

const SecondPage = ({ pageContext: { locale, translations }, location }) => (
    <MainLayout locale={locale} translationsPaths={translations}>
        <SEO
            title='demo.page2.headerTitle'
            location={location}
            translationsPaths={translations}
            description='demo.page2.description'
        />
        <div className='container'>
            <FormattedMessage id='demo.page2.hello' tagName='h1' />
            <FormattedMessage id='demo.page2.welcome' tagName='p' />
            <LocalizedLink to='/'>
                <FormattedMessage id='demo.page2.link' />
            </LocalizedLink>
        </div>
    </MainLayout>
);

SecondPage.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        translations: PropTypes.array.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default SecondPage;
