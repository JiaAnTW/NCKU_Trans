import { SET_POST_ON_NEXT } from '../action/post';
import { CLOSE_MODAL } from '../action/modal';
import { ADD_REQUEST, FINISH_REQUEST } from '../action/request';

export const postMajorData = (formData) => {
    const params = formData;

    params.comment = params.comment.replace(/\n|\r\n/g, '<br>');

    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch('/api/create/major', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
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
