import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import LocalizedLink from '../views/components/LocalizedLink';
import SEO from '../views/components/SEO';
import MainLayout from '../views/layouts/MainLayout';

const IndexPage = ({ location, pageContext: { locale, translations } }) => {
    const breakpoints = useBreakpoint();
    console.log(breakpoints);
    return (
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
};

IndexPage.propTypes = {
    location: PropTypes.object.isRequired,
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        translations: PropTypes.array.isRequired,
    }).isRequired,
};

export default IndexPage;
