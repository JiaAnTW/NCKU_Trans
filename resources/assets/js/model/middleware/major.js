import { INIT_MAJOR } from '../action/major';
import { ADD_REQUEST, FINISH_REQUEST } from '../action/request';
import Cookies from 'js-cookie';

export const fetchMajor = () => {
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch('/api/get/major')
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: INIT_MAJOR,
                    payload: { data },
                });
                dispatch({
                    type: FINISH_REQUEST,
                });
            })
            .catch((e) => console.log('錯誤:', e));
    };
};

export const fetchMajorAdmin = () => {
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch('/api/get/major/all', {
            method: 'GET',
            headers: new Headers({
                Authorization: 'Bearer ' + Cookies.get('adminToken'),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: INIT_MAJOR,
                    payload: { data },
                });
                dispatch({
                    type: FINISH_REQUEST,
                });
            })
            .catch((e) => {
                location.href = '/#/admin/login';
            });
    };
};
