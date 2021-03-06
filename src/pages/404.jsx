import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import LocalizedLink from '../views/components/LocalizedLink';
import SEO from '../views/components/SEO';
import MainLayout from '../views/layouts/MainLayout';

const NotFoundPage = ({ location, pageContext: { locale, translations } }) => {
    if (locale === undefined) {
        if (typeof window !== `undefined`) {
            locale =
                sessionStorage.getItem(`lang`) !== null
                    ? sessionStorage.getItem(`lang`)
                    : `fr`;
        } else {
            locale = `fr`;
        }
    }
    return (
        <MainLayout locale={locale} translationsPaths={translations}>
            <SEO
                title='demo.p404.headerTitle'
                description='demo.p404.description'
                location={location}
                translationsPaths={translations}
                pageType='404'
            />
            <FormattedMessage id='demo.p404.title' tagName='h1' />
            <FormattedMessage id='demo.p404.description' tagName='p' />
            <LocalizedLink to='/'>
                <FormattedMessage id='demo.page2.link' />
            </LocalizedLink>
        </MainLayout>
    );
};

NotFoundPage.propTypes = {
    location: PropTypes.object.isRequired,
    pageContext: PropTypes.shape({
        locale: PropTypes.string,
        translations: PropTypes.array.isRequired,
    }).isRequired,
};

export default NotFoundPage;
