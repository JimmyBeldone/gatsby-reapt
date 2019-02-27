import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";

import configureStore from "../store/configureStore";

const store = configureStore();

const ReduxWrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
);

ReduxWrapper.propTypes = {
    children: PropTypes.element.isRequired
};

export default ReduxWrapper;
