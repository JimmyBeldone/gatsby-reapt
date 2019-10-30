import React from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';

import siteConfig from '../../../config/siteConfig';
import I18nProvider from '../../providers/I18nProvider';
import { getLangs } from '../../utils/lang';
import { WebpProvider } from '../components/WebpDetect';

import Header from './Header/Header';
import Footer from './Footer/Footer';

const MainLayout = ({
    locale,
    children,
    is404,
    originalPath,
    blogPostTranslation,
    isBlogPost,
}) => {
    if (typeof window !== `undefined`) {
        sessionStorage.setItem(`lang`, locale);
    }

    const langsMenu = isBlogPost
        ? blogPostTranslation
        : getLangs(locale, originalPath, is404);

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
    isBlogPost: false,
    blogPostTranslation: [],
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    locale: PropTypes.string.isRequired,
    is404: PropTypes.bool,
    originalPath: PropTypes.string.isRequired,
    blogPostTranslation: PropTypes.array,
    isBlogPost: PropTypes.bool,
};

export default MainLayout;
