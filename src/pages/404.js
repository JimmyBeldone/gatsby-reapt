import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

import Layout from "../components/layout";
import LocalizedLink from "../components/LocalizedLink";
import SEO from "../components/seo";

const NotFoundPage = ({ pageContext: { locale }, location }) => {
    if (locale === undefined) {
        if (typeof window !== `undefined`) {
            locale =
                sessionStorage.getItem("lang") !== null
                    ? sessionStorage.getItem("lang")
                    : "fr";
        } else {
            locale = "fr";
        }
    }
    return (
        <Layout locale={locale} location={location} is404>
            <SEO title="demo.p404.headerTitle" />
            <h1>
                <FormattedMessage id="demo.p404.title" />
            </h1>
            <p>
                <FormattedMessage id="demo.p404.description" />
            </p>
            <LocalizedLink to="/">
                <FormattedMessage id="demo.page2.link" />
            </LocalizedLink>
        </Layout>
    );
};

NotFoundPage.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string
    }).isRequired,
    location: PropTypes.object.isRequired
};

export default NotFoundPage;
