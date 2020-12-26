import { combineReducers } from 'redux';
import majorReducer from './major.js';
import QAReducer from './qa.js';
import departmentReducer from './department.js';
import collegeReducer from './college.js';
import modalReducer from './modal.js';
import requestReducer from './request.js';
import postReducer from './post.js';

export default combineReducers({
    major: majorReducer,
    QA: QAReducer,
    in_maj: departmentReducer,
    college: collegeReducer,
    modal: modalReducer,
    request: requestReducer,
    post: postReducer,
});
