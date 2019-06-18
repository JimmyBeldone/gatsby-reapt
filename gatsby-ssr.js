import React from 'react';

import { PAGE_ML } from './src/constants/router';

const activeEnv = process.env.MODE || process.env.NODE_ENV || `development`;

// eslint-disable-next-line import/no-extraneous-dependencies
require(`dotenv`).config({
    path: `.env.${activeEnv}`,
});

export const onRenderBody = (
    { setPostBodyComponents, pathname },
    pluginOptions,
) => {
    if (process.env.NODE_ENV === `production`) {
        setPostBodyComponents([
            <script
                key={`tarteaucitron-init`}
                src='/tarteaucitron/tarteaucitron.js'
            />,
            <script
                key={`tarteaucitron-init`}
                dangerouslySetInnerHTML={{
                    __html: `tarteaucitron.init({
                        privacyUrl: "" /* Privacy policy url */,
                        hashtag: "#tarteaucitron" /* Open the panel with this hashtag */,
                        cookieName: "tarteaucitron" /* Cookie name */,
                        orientation: "bottom" /* Banner position (top - bottom) */,
                        showAlertSmall: true /* Show the small banner on bottom right */,
                        cookieslist: true /* Show the cookie list */,
                        adblocker: false /* Show a Warning if an adblocker is detected */,
                        AcceptAllCta: true /* Show the accept all button when highPrivacy on */,
                        highPrivacy: false /* Disable auto consent */,
                        handleBrowserDNTRequest: false /* If Do Not Track == 1, disallow all */,
                        removeCredit: false /* Remove credit link */,
                        moreInfoLink: true /* Show more info link */,
                        useExternalCss: false /* If false, the tarteaucitron.css file will be loaded */,
                        //"cookieDomain": ".my-multisite-domaine.fr", /* Shared cookie for multisite */
                        readmoreLink: ${PAGE_ML} /* Change the default readmore link */
                    })`,
                }}
            />,
            <script
                key={`tarteaucitron-google-analytics`}
                dangerouslySetInnerHTML={{
                    __html: `tarteaucitron.user.gtagUa = '${process.env.GTAG}';
                        tarteaucitron.user.gtagMore = function () {
                            /* add here your optionnal _ga.push() */
                        };
                        (tarteaucitron.job = tarteaucitron.job || []).push('gtag');`,
                }}
            />,
        ]);
    }
};
