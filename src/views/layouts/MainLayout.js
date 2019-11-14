import React from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';

import siteConfig from '../../../config/siteConfig';
import I18nProvider from '../../providers/I18nProvider';
import { WebpProvider } from '../components/WebpDetect';

import Header from './Header/Header';
import Footer from './Footer/Footer';

const MainLayout = ({ locale, children, translationsPaths }) => {
    if (typeof window !== `undefined`) {
        sessionStorage.setItem(`lang`, locale);
    }

    return (
        <I18nProvider locale={locale}>
            <div id='app'>
                <WebpProvider>
                    <>
                        <Headroom>
                            <Header
                                siteTitle={siteConfig.title}
                                translationsPaths={translationsPaths}
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

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    locale: PropTypes.string.isRequired,
    translationsPaths: PropTypes.array.isRequired,
};

export default MainLayout;
