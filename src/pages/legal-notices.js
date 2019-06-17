/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import MainLayout from '../views/layouts/MainLayout';
import SEO from '../views/components/SEO';

const MLPage = ({ pageContext: { locale }, location }) => {
    // const cnilLink = (
    //     <a
    //         href='http://www.cnil.fr/vos-droits/vos-traces/les-cookies/'
    //         target='_blank'
    //         rel='noreferrer noopener'
    //     >
    //         http://www.cnil.fr/vos-droits/vos-traces/les-cookies/
    //     </a>
    // );
    return (
        <MainLayout locale={locale} location={location}>
            <SEO title='demo.ml.headerTitle' location={location} />
            <div className='container'>
                <h1>
                    <FormattedMessage id='demo.ml.title' />
                </h1>
            </div>
        </MainLayout>
    );
};

MLPage.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default MLPage;
