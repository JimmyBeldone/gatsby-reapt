/* eslint-disable security/detect-object-injection */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { IntlProvider, addLocaleData, FormattedMessage } from "react-intl";
import { StaticQuery, graphql } from "gatsby";
// Locale data
import frData from "react-intl/locale-data/fr";
import enData from "react-intl/locale-data/en";

import "./layout.css";
import "./global.styl";

import en from "../lang/en/";
import fr from "../lang/fr/";
import { flattenMessages, getLangs } from "../utils/lang";

import Header from "./header";

const messages = { en, fr };

addLocaleData([...enData, ...frData]);

const Layout = ({ locale, children, location, is404 }) => {
    if (typeof window !== `undefined`) {
        sessionStorage.setItem("lang", locale);
    }
    const { pathname: url } = location;
    const langsMenu = getLangs(locale, url, is404);
    return (
        <StaticQuery
            query={graphql`
                query SiteTitleQuery {
                    site {
                        siteMetadata {
                            title
                        }
                    }
                }
            `}
            render={data => (
                // eslint-disable-next-line security/detect-object-injection
                <IntlProvider
                    locale={locale}
                    // eslint-disable-next-line security/detect-object-injection
                    messages={flattenMessages(messages[locale])}
                    textComponent={Fragment}
                >
                    <>
                        <Header
                            siteTitle={data.site.siteMetadata.title}
                            langs={langsMenu}
                        />
                        <div
                            style={{
                                margin: `0 auto`,
                                maxWidth: 960,
                                padding: `0px 1.0875rem 1.45rem`,
                                paddingTop: 0
                            }}
                        >
                            <main>{children}</main>
                            <footer>
                                © {new Date().getFullYear()},{" "}
                                <FormattedMessage id="demo.footer.built" />
                                {` `}
                                <a href="https://www.gatsbyjs.org">Gatsby</a>
                            </footer>
                        </div>
                    </>
                </IntlProvider>
            )}
        />
    );
};

Layout.DefaultProps = {
    is404: false
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    locale: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    is404: PropTypes.bool
};

export default Layout;
