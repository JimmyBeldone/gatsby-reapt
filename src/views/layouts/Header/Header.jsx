import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import './Header.styl';
import LocalizedLink from '../../components/LocalizedLink';
import Search from '../../components/Search';
import SwitchLangBtn from '../../components/SwitchLangBtn';
import Nav from '../Nav';

// const logo = require("../../../assets/img/logo_white.svg");

const Header = ({ locale, siteTitle, translationsPaths }) => (
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
    locale: PropTypes.string.isRequired,
    siteTitle: PropTypes.string,
    translationsPaths: PropTypes.array.isRequired,
};

export default Header;
