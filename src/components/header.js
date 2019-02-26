/* eslint-disable security/detect-object-injection */
import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";

import LocalizedLink from "./LocalizedLink";

const Header = ({ siteTitle, langs }) => (
    <header
        style={{
            background: `rebeccapurple`,
            marginBottom: `1.45rem`
        }}
    >
        <div
            style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `1.45rem 1.0875rem`
            }}
        >
            <h1 style={{ margin: 0 }}>
                <LocalizedLink to="/">
                    <div
                        style={{
                            color: `white`,
                            textDecoration: `none`
                        }}
                    >
                        <FormattedMessage id={siteTitle} />
                    </div>
                </LocalizedLink>
            </h1>
            <nav>
                {langs.map(lang => (
                    <Link
                        className={lang.selected ? "active" : ""}
                        key={lang.langKey}
                        to={lang.link}
                    >
                        {lang.langValue}
                    </Link>
                ))}
            </nav>
        </div>
    </header>
);

Header.propTypes = {
    siteTitle: PropTypes.string,
    langs: PropTypes.array.isRequired
};

Header.defaultProps = {
    siteTitle: ``
};

export default injectIntl(Header);
