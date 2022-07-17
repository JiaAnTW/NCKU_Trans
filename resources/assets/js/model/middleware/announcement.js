import { INIT_ANNOOUNCE, SET_ANNOOUNCE } from '../action/announcement';
import { ADD_REQUEST, FINISH_REQUEST } from '../action/request';
import Cookies from 'js-cookie';

export const fetchAnnouncement = (callback) => {
    return (dispatch) => {
        fetch('/api/get/announcement')
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: INIT_ANNOOUNCE,
                    payload: { data },
                });
                if (callback) callback(data);
            })
            .catch((e) => console.log('錯誤:', e));
    };
};

export const updateAnnouncement = ({ id, msg, isShow }) => {
    const body = { id, msg, isShow };
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch(`/api/post/announcement/${id.toString()}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('adminToken'),
            }),
            body: JSON.stringify(body),
        })
            .then((data) => {
                dispatch({
                    type: FINISH_REQUEST,
                });

                dispatch({
                    type: SET_ANNOOUNCE,
                    payload: { value: { msg, isShow } },
                });
            })
            .catch((e) => {
                location.href = '/admin/login';
            });
    };
};
