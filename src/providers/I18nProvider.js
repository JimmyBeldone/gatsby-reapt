import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import '@formatjs/intl-relativetimeformat/polyfill';
/*
    Locale 'en' is imported by default,
    To load additional locale, you can include them on demand like below.
    If you want to polyfill all locales :
    import '@formatjs/intl-relativetimeformat/polyfill-locales'
*/
import '@formatjs/intl-relativetimeformat/dist/locale-data/fr';

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
