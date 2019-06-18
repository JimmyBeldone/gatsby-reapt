import 'typeface-montserrat';
import 'typeface-lato';

import './src/styles/vendors/sanitize.styl';
import './src/styles/vendors/sanitize.styl';
import './src/styles/vendors/reset.styl';
import './src/styles/vendors/pace.styl';
import './src/styles/layout.styl';
import './src/styles/global.styl';

export const onServiceWorkerUpdateReady = () => window.location.reload(true);

export const onClientEntry = () => {
    // Without this function body the import will not be picked up.
};

// import ReduxWrapper from "./src/providers/ReduxWrapper";

// export const wrapRootElement = ReduxWrapper;
