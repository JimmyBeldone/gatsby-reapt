import {
    format,
    formatDistanceToNow,
    formatRelative,
    parseISO,
} from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';

const locales = { en: enUS, fr };

const FormattedDate = ({
    date,
    intl: { locale },
    isDistant,
    isRelative,
    style,
}) => {
    const getFormattedDate = () => {
        if (isRelative)
            return formatRelative(parseISO(date), new Date(), {
                locale: locales[locale],
            });
        if (isDistant)
            return formatDistanceToNow(parseISO(date), {
                locale: locales[locale],
            });
        return format(parseISO(date), 'PP', {
            locale: locales[locale],
        });
    };
    return <span style={style}>{getFormattedDate()}</span>;
};

FormattedDate.defaultProps = {
    isDistant: false,
    isRelative: false,
    style: {},
};

FormattedDate.propTypes = {
    date: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.instanceOf(Date),
        PropTypes.string,
    ]).isRequired,
    intl: PropTypes.object.isRequired,
    isDistant: PropTypes.bool,
    isRelative: PropTypes.bool,
    style: PropTypes.object,
};

export default injectIntl(FormattedDate);
