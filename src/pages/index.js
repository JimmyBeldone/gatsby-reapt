import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import LocalizedLink from "../components/LocalizedLink";

const IndexPage = ({ pageContext: { locale }, location }) => {
    return (
        <Layout locale={locale} location={location}>
            <SEO
                title="demo.home.headerTitle"
                keywords={[`gatsby`, `application`, `react`]}
            />
            <h1>
                <FormattedMessage id="demo.home.hello" />
            </h1>
            <p>
                <FormattedMessage id="demo.home.welcome" />
            </p>
            <p>
                <FormattedMessage id="demo.home.now" />
            </p>
            <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
                <Image />
            </div>
            <LocalizedLink to="/page-2/">
                <FormattedMessage id="demo.home.link" />
            </LocalizedLink>
            <br />
            <LocalizedLink to="/dqsersdrys/">vers 404</LocalizedLink>
        </Layout>
    );
};

IndexPage.propTypes = {
    pageContext: PropTypes.shape({
        locale: PropTypes.string.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired
};

export default IndexPage;
