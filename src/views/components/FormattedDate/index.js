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

const locales = { fr, en: enUS };

const FormattedDate = ({
    intl: { locale },
    date,
    isRelative,
    isDistant,
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
    isRelative: false,
    isDistant: false,
    style: {},
};

FormattedDate.propTypes = {
    date: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.instanceOf(Date),
        PropTypes.string,
    ]).isRequired,
    isRelative: PropTypes.bool,
    isDistant: PropTypes.bool,
    style: PropTypes.object,
};

export default injectIntl(FormattedDate);
