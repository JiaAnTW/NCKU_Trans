import { combineReducers } from "redux";
import majorReducer from "./major.js";
import QAReducer from './qa.js';

export default combineReducers({
    major: majorReducer,
    QA: QAReducer,
});