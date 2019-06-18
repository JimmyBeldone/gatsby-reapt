import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import I18nProvider from '../../providers/I18nProvider';
import { getLangs } from '../../utils/lang';
import { WebpProvider } from '../components/WebpDetect';

import Header from './Header/Header';
import Footer from './Footer/Footer';

const MainLayout = ({ locale, children, location, is404 }) => {
    if (typeof window !== `undefined`) {
        sessionStorage.setItem(`lang`, locale);
    }

    const { pathname: url } = location;
    const langsMenu = getLangs(locale, url, is404);

    const { site } = useStaticQuery(
        graphql`
            query LayoutQuery {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `,
    );

    return (
        <I18nProvider locale={locale}>
            <div id='app'>
                <WebpProvider>
                    <>
                        <Header
                            siteTitle={site.siteMetadata.title}
                            langs={langsMenu}
                            locale={locale}
                        />
                        <main>{children}</main>
                        <Footer />
                    </>
                </WebpProvider>
            </div>
        </I18nProvider>
    );
};

MainLayout.defaultProps = {
    is404: false,
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    locale: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    is404: PropTypes.bool,
};

export default MainLayout;
