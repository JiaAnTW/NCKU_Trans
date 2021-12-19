import { combineReducers } from 'redux';
import majorReducer from './major.js';
import QAReducer from './qa.js';
import studyReducer from './study.js';
import departmentReducer from './department.js';
import collegeReducer from './college.js';
import modalReducer from './modal.js';
import requestReducer from './request.js';
import postReducer from './post/index.js';
import announceReducer from './announcement.js';

export default combineReducers({
    major: majorReducer,
    QA: QAReducer,
    study: studyReducer,
    in_maj: departmentReducer,
    college: collegeReducer,
    modal: modalReducer,
    request: requestReducer,
    post: postReducer,
    announcement: announceReducer,
});
