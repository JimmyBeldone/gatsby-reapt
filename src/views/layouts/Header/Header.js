import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './Header.styl';
import Nav from '../Nav';
import SwitchLangBtn from '../../components/SwitchLangBtn';
import LocalizedLink from '../../components/LocalizedLink';
import Search from '../../components/Search';

// const logo = require("../../../assets/img/logo_white.svg");

const Header = ({ translationsPaths, locale, siteTitle }) => (
    <header>
        <div className='container'>
            <div className='content'>
                <LocalizedLink to='/'>
                    <div className='logo'>
                        {/* <img src={logo} alt="" /> */}
                        <FormattedMessage id={siteTitle} />
                    </div>
                </LocalizedLink>
                <Nav />
                <Search locale={locale} />
                <SwitchLangBtn
                    translationsPaths={translationsPaths}
                    locale={locale}
                />
            </div>
        </div>
    </header>
);

Header.defaultProps = {
    siteTitle: ``,
};

Header.propTypes = {
    siteTitle: PropTypes.string,
    translationsPaths: PropTypes.array.isRequired,
    locale: PropTypes.string.isRequired,
};

export default Header;
