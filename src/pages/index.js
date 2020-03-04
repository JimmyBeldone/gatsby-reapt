import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import LocalizedLink from '../views/components/LocalizedLink';
import SEO from '../views/components/SEO';
import MainLayout from '../views/layouts/MainLayout';

const IndexPage = ({ pageContext: { locale, translations }, location }) => (
    <MainLayout locale={locale} translationsPaths={translations}>
        <SEO
            title='demo.home.headerTitle'
            location={location}
            translationsPaths={translations}
        />
        <div className='container'>
            <FormattedMessage id='demo.home.hello' tagName='h1' />
            <FormattedMessage id='demo.home.welcome' tagName='p' />
            <FormattedMessage id='demo.home.now' tagName='p' />
            <LocalizedLink to='/page-2/' hasSlug>
                <FormattedMessage id='demo.home.link' />
            </LocalizedLink>
        </div>
    </MainLayout>
);

IndexPage.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        translations: PropTypes.array.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default IndexPage;
