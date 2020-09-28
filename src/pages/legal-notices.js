/* eslint-disable react/jsx-pascal-case */
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import SEO from '../views/components/SEO';
import MainLayout from '../views/layouts/MainLayout';

const MLPage = ({ location, pageContext: { locale, translations } }) => {
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
        <MainLayout locale={locale} translationsPaths={translations}>
            <SEO
                title='demo.ml.headerTitle'
                location={location}
                translationsPaths={translations}
                description='demo.ml.description'
            />
            <div className='container'>
                <FormattedMessage id='demo.ml.title' tagName='h1' />
            </div>
        </MainLayout>
    );
};

MLPage.propTypes = {
    location: PropTypes.object.isRequired,
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        translations: PropTypes.array.isRequired,
    }).isRequired,
};

export default MLPage;
