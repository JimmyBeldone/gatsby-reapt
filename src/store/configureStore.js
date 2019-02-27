import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers";

const configureStore = () => {
    const windowGlobal = typeof window !== "undefined" && window;

    const devtools =
        process.env.NODE_ENV === "development" && windowGlobal.devToolsExtension
            ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
              window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f;

    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk),
            devtools
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("../reducers", () => {
            // const nextReducer = require("../reducers").default; // eslint-disable-line global-require
            store.replaceReducer(rootReducer);
        });
    }

    return store;
};

export default configureStore;
