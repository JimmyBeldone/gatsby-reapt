/* eslint-disable react/jsx-pascal-case */
import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

import LocalizedLink from "../components/LocalizedLink";
import Layout from "../components/layout";
import SEO from "../components/seo";

const SecondPage = ({ pageContext: { locale }, location }) => (
    <Layout locale={locale} location={location}>
        <SEO title="demo.page2.headerTitle" />
        <h1>
            <FormattedMessage id="demo.page2.hello" />
        </h1>
        <p>
            <FormattedMessage id="demo.page2.welcome" />
        </p>
        <LocalizedLink to="/">
            <FormattedMessage id="demo.page2.link" />
        </LocalizedLink>
    </Layout>
);

SecondPage.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired
};

export default SecondPage;
