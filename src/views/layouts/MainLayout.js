import React from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';
import siteConfig from 'Config';

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

    return (
        <I18nProvider locale={locale}>
            <div id='app'>
                <WebpProvider>
                    <>
                        <Headroom>
                            <Header
                                siteTitle={siteConfig.title}
                                langs={langsMenu}
                                locale={locale}
                            />
                        </Headroom>
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
