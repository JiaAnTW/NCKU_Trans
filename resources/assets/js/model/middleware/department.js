import Cookies from 'js-cookie';

import { INIT_DEPARTMENT, REMOVE_EDIT_DEPARTMENT } from '../action/department';
import { INIT_POST_OPTION_DEPARTMENT } from '../action/post';
import { ADD_REQUEST, FINISH_REQUEST } from '../action/request';

export const fetchDepartment = () => {
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch('/api/get/department')
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: INIT_DEPARTMENT,
                    payload: { data },
                });
                dispatch({
                    type: INIT_POST_OPTION_DEPARTMENT,
                    payload: { departmentArr: data },
                });
                dispatch({
                    type: FINISH_REQUEST,
                });
            })
            .catch((e) => console.log('錯誤:', e));
    };
};

export const updateDepartment = (id, name, college) => {
    const body = { id, name, college };
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch(`/api/post/department/${id}`, {
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
                    type: REMOVE_EDIT_DEPARTMENT,
                    payload: { value: { id } },
                });
                dispatch({
                    type: FINISH_REQUEST,
                });
            })
            .catch((e) => console.log('錯誤:', e));
    };
};
