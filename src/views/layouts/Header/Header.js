import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './Header.styl';
import Nav from '../Nav';
import SwitchLangBtn from '../../components/SwitchLangBtn';
import LocalizedLink from '../../components/LocalizedLink';

// const logo = require("../../../assets/img/logo_white.svg");

const Header = ({ langs, locale, siteTitle }) => (
    <header>
        <div className="container">
            <div className="content">
                <LocalizedLink to="/">
                    <div className="logo">
                        {/* <img src={logo} alt="" /> */}
                        <FormattedMessage id={siteTitle} />
                    </div>
                </LocalizedLink>
                <Nav />
                <SwitchLangBtn langs={langs} locale={locale} />
            </div>
        </div>
    </header>
);

Header.defaultProps = {
    siteTitle: ``,
};

Header.propTypes = {
    siteTitle: PropTypes.string,
    langs: PropTypes.array.isRequired,
    locale: PropTypes.string.isRequired,
};

export default Header;
