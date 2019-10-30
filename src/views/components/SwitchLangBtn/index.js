/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { FormattedMessage } from 'react-intl';

import './SwitchLangBtn.styl';

const SwitchLangBtn = ({ langs, locale }) => {
    const nav = e => {
        e.preventDefault();
        const selected = e.currentTarget.value;
        const link = langs
            .filter(lang => lang.langKey === selected)
            .map(lang => lang.link)
            .pop();
        navigate(link);
    };

    return (
        <div className='swith-lang-bloc'>
            <label htmlFor='lang-select'>
                <FormattedMessage id='general.lang' />
            </label>
            <select
                id='lang-select'
                onChange={e => nav(e)}
                defaultValue={locale}
            >
                {langs.map(lang => (
                    <option key={lang.langKey} value={lang.langKey}>
                        {lang.langValue}
                    </option>
                ))}
            </select>
        </div>
    );
};

SwitchLangBtn.propTypes = {
    langs: PropTypes.array.isRequired,
    locale: PropTypes.string.isRequired,
};

export default SwitchLangBtn;
