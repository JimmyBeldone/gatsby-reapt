import 'typeface-montserrat';
import 'typeface-lato';

import './src/styles/vendors/sanitize.styl';
import './src/styles/vendors/reset.styl';
import './src/styles/global.styl';
// import React from 'react';

// import { AuthProvider } from './src/providers/AuthProvider';

export const onServiceWorkerUpdateReady = () => window.location.reload(true);

export const onClientEntry = async () => {
    // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
    if (typeof window.IntersectionObserver === `undefined`) {
        await import(`intersection-observer`);
        console.log(`# IntersectionObserver is polyfilled!`);
    }
};

// export const wrapPageElement = ({ element, props }) => {
//     // props provide same data to Layout as Page element will get
//     // including location, data, etc - you don't need to pass it
//     return <AuthProvider>{element}</AuthProvider>;
// };
