import { combineReducers } from "redux";
import majorReducer from "./major.js";

export default combineReducers({
    major: majorReducer,
});