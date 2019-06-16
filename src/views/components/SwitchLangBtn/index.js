/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from "gatsby";
import { navigate } from 'gatsby';
import { FormattedMessage } from 'react-intl';
// import flag_FR from "svg-country-flags/svg/fr.svg";
// import flag_GB from "svg-country-flags/svg/gb.svg";
// import flag_BE from "svg-country-flags/svg/be.svg";

import './SwitchLangBtn.styl';

// const flags = {
//     fr: flag_FR,
//     en: flag_GB,
//     nl: flag_BE
// };

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
            {/* {langs.map(lang => (
                <Link
                    className={lang.selected ? "active" : ""}
                    key={lang.langKey}
                    to={lang.link}
                    title={lang.langValue}
                >
                    <img
                        // eslint-disable-next-line security/detect-object-injection
                        src={flags[lang.langKey]}
                        alt={lang.langValue + "flag"}
                        height="30px"
                        width="40px"
                    />
                </Link>
            ))} */}
        </div>
    );
};

SwitchLangBtn.propTypes = {
    langs: PropTypes.array.isRequired,
    locale: PropTypes.string.isRequired,
};

export default SwitchLangBtn;
