import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import MainLayout from '../views/layouts/MainLayout';
import LocalizedLink from '../views/components/LocalizedLink';
import SEO from '../views/components/SEO';

const NotFoundPage = ({ pageContext: { locale }, location }) => {
    if (locale === undefined) {
        if (typeof window !== `undefined`) {
            locale =
                sessionStorage.getItem('lang') !== null
                    ? sessionStorage.getItem('lang')
                    : 'fr';
        } else {
            locale = 'fr';
        }
    }
    return (
        <MainLayout locale={locale} location={location} is404>
            <SEO title="demo.p404.headerTitle" />
            <h1>
                <FormattedMessage id="demo.p404.title" />
            </h1>
            <p>
                <FormattedMessage id="demo.p404.description" />
            </p>
            <LocalizedLink to="/">
                <FormattedMessage id="demo.page2.link" />
            </LocalizedLink>
        </MainLayout>
    );
};

NotFoundPage.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default NotFoundPage;
