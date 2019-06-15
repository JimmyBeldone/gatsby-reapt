import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { IntlProvider, addLocaleData } from "react-intl";
// Locale data
import frData from "react-intl/locale-data/fr";
import enData from "react-intl/locale-data/en";

import en from "../lang/en/";
import fr from "../lang/fr/";
import { flattenMessages } from "../utils/lang";

const messages = { en, fr };

addLocaleData([...enData, ...frData]);

const I18nProvider = ({ locale, children }) => {
    return (
        <IntlProvider
            locale={locale}
            // eslint-disable-next-line security/detect-object-injection
            messages={flattenMessages(messages[locale])}
            textComponent={Fragment}
        >
            {children}
        </IntlProvider>
    );
};

I18nProvider.propTypes = {
    children: PropTypes.node.isRequired,
    locale: PropTypes.string.isRequired
};

export default I18nProvider;
