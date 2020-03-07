import 'typeface-montserrat';
import 'typeface-lato';

import './src/styles/vendors/sanitize.styl';
import './src/styles/vendors/reset.styl';
import './src/styles/global.styl';

export const onServiceWorkerUpdateReady = () => window.location.reload(true);

export const onClientEntry = async () => {
    // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
    if (typeof window.IntersectionObserver === `undefined`) {
        await import(`intersection-observer`);
        console.log(`# IntersectionObserver is polyfilled!`);
    }
};
