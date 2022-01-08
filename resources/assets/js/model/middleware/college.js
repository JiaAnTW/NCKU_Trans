import Cookies from 'js-cookie';

import {
    INIT_COLLEGE,
    CREATE_COLLEGE,
    REMOVE_EDIT_COLLEGE,
    DELETE_COLLEGE,
} from '../action/college';

import { EDIT_DEPARTMENT_COLLEGE } from '../action/department';
import { INIT_POST_OPTION_COLLEGE } from '../action/post';
import { ADD_REQUEST, FINISH_REQUEST } from '../action/request';

export const fetchCollege = () => {
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch('http://localhost:8000' + '/api/get/college')
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: INIT_COLLEGE,
                    payload: { data },
                });
                dispatch({
                    type: INIT_POST_OPTION_COLLEGE,
                    payload: { collegeArr: data },
                });
                dispatch({
                    type: FINISH_REQUEST,
                });
            })
            .catch((e) => console.log('錯誤:', e));
    };
};

export const createCollege = ({ name }, callback) => {
    const body = { name };
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch('http://localhost:8000' + `/api/post/college`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('adminToken'),
            }),
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: CREATE_COLLEGE,
                    payload: { value: data.dataInfo },
                });
                dispatch({
                    type: FINISH_REQUEST,
                });
                callback(data);
            })
            .catch((e) => console.log('錯誤:', e));
    };
};

export const updateCollege = (id, name, nameOld) => {
    const body = { id, name };
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch('http://localhost:8000' + `/api/post/college/${id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('adminToken'),
            }),
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: REMOVE_EDIT_COLLEGE,
                    payload: { value: { id } },
                });
                dispatch({
                    type: EDIT_DEPARTMENT_COLLEGE,
                    payload: {
                        value: { collegeNext: name, collegeOld: nameOld },
                    },
                });
                dispatch({
                    type: FINISH_REQUEST,
                });
            })
            .catch((e) => console.log('錯誤:', e));
    };
};

export const deleteCollege = (id) => {
    const body = { id };
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch('http://localhost:8000' + `/api/post/college/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('adminToken'),
            }),
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then(() => {
                dispatch({
                    type: DELETE_COLLEGE,
                    payload: { value: { id } },
                });
                dispatch({
                    type: FINISH_REQUEST,
                });
            })
            .catch((e) => console.log('錯誤:', e));
    };
};
