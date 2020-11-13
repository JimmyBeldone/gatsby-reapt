import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';

import en from '../lang/en';
import fr from '../lang/fr';

const messagesLangs = { en, fr };

const flattenMessages = (nestedMessages, prefix = ``) =>
    Object.keys(nestedMessages).reduce((messages, key) => {
        const value = nestedMessages[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === `string`) {
            // eslint-disable-next-line no-param-reassign
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});

const I18nProvider = ({ children, locale }) => {
    return (
        <IntlProvider
            locale={locale}
            messages={flattenMessages(messagesLangs[locale])}
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
