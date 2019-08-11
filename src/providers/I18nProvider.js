import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import en from '../lang/en/';
import fr from '../lang/fr/';
import { flattenMessages } from '../utils/lang';

const messages = { en, fr };

const I18nProvider = ({ locale, children }) => {
    return (
        <IntlProvider
            locale={locale}
            messages={flattenMessages(messages[locale])}
            textComponent={Fragment}
        >
            {children}
        </IntlProvider>
    );
};

I18nProvider.propTypes = {
    children: PropTypes.node.isRequired,
    locale: PropTypes.string.isRequired,
};

export default I18nProvider;
