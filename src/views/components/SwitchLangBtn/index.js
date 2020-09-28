/* eslint-disable jsx-a11y/no-onchange */
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import './SwitchLangBtn.styl';

const SwitchLangBtn = ({ locale, translationsPaths }) => {
    const nav = (e) => {
        e.preventDefault();
        const selected = e.currentTarget.value;
        const link = translationsPaths
            .filter((lang) => lang.langKey === selected)
            .map((lang) => lang.link)
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
                onChange={(e) => nav(e)}
                defaultValue={locale}
            >
                {translationsPaths.map((lang) => (
                    <option key={lang.langKey} value={lang.langKey}>
                        {lang.langValue}
                    </option>
                ))}
            </select>
        </div>
    );
};

SwitchLangBtn.propTypes = {
    locale: PropTypes.string.isRequired,
    translationsPaths: PropTypes.array.isRequired,
};

export default SwitchLangBtn;
