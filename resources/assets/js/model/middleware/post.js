import { SET_POST_ON_NEXT } from '../action/post';
import { CLOSE_MODAL } from '../action/modal';
import { ADD_REQUEST, FINISH_REQUEST } from '../action/request';
import Cookies from 'js-cookie';

export const postStudyData = (formData) => {
    const params = formData;
    params.content = params.content.replace(/\n|\r\n/g, '<br>');

    const url =
        formData.id === -1
            ? '/api/post/study'
            : `/api/post/study?id={${formData.id.toString()}}`;

    const headerSettings = {
        'Content-Type': 'application/json',
    };
    if (formData.id !== -1) {
        headerSettings.Authorization = `Bearer ${Cookies.get('adminToken')}`;
    }

    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch(url, {
            method: formData.id === -1 ? 'POST' : 'PUT',
            body: JSON.stringify(params),
            headers: new Headers(headerSettings),
        })
            .then(() => {
                for (let i = 0; i < 2; ++i)
                    dispatch({
                        type: SET_POST_ON_NEXT,
                    });

                dispatch({
                    type: CLOSE_MODAL,
                });

                dispatch({
                    type: FINISH_REQUEST,
                });
            })
            .catch();
    };
};

export const postMajorData = (formData) => {
    const params = formData;
    params.comment = params.comment.replace(/\n|\r\n/g, '<br>');

    const url =
        formData.id === -1
            ? '/api/create/major'
            : '/api/post/major/' + formData.id.toString();

    const headerSettings = {
        'Content-Type': 'application/json',
    };
    if (formData.id !== -1) {
        headerSettings.Authorization = `Bearer ${Cookies.get('adminToken')}`;
    }

    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch(url, {
            method: formData.id === -1 ? 'POST' : 'PUT',
            body: JSON.stringify(params),
            headers: new Headers(headerSettings),
        })
            .then(() => {
                for (let i = 0; i < 2; ++i)
                    dispatch({
                        type: SET_POST_ON_NEXT,
                    });

                dispatch({
                    type: CLOSE_MODAL,
                });

                dispatch({
                    type: FINISH_REQUEST,
                });
            })
            .catch();
    };
};
