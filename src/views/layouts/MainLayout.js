import { Grommet } from 'grommet';
import PropTypes from 'prop-types';
import React from 'react';
import Headroom from 'react-headroom';

import siteConfig from '../../../config/siteConfig';
import I18nProvider from '../../providers/I18nProvider';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const MainLayout = ({ children, locale, translationsPaths }) => {
    if (typeof window !== `undefined`) {
        sessionStorage.setItem(`lang`, locale);
    }

    return (
        <I18nProvider locale={locale}>
            <div id='app'>
                <Grommet plain>
                    <div id='content-wrap'>
                        <Headroom>
                            <Header
                                siteTitle={siteConfig.title}
                                translationsPaths={translationsPaths}
                                locale={locale}
                            />
                        </Headroom>
                        <main>
                            <div id='content'>{children}</div>
                        </main>
                    </div>
                    <Footer />
                </Grommet>
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
