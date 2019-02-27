import { combineReducers } from "redux";

import errorReducer from "./errorReducer";

const rootReducer = {
    errors: errorReducer
};

export default combineReducers(rootReducer);
