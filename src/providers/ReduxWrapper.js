import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store/configureStore';

// eslint-disable-next-line react/prop-types
export default ({ element }) => {
    const store = configureStore();
    return <Provider store={store}>{element}</Provider>;
};
