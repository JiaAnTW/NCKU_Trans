import { RESET_POST_FORM } from '../action/post';
import { ADD_REQUEST, FINISH_REQUEST } from '../action/request';

export const postMajorData = (formData) => {
    const params = {
        rank_1: formData.rank_1,
        rank_2: formData.rank_2,
        year: formData.year,
        score: formData.score,
        in_maj: formData.in_maj,
        out_maj: formData.out_maj,
        comment: formData.comment,
    };

    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch('/api/create/major', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
            .then((res) => res.json())
            .then(() => {
                dispatch({
                    type: RESET_POST_FORM,
                    payload: { status: 'success' },
                });
                dispatch({
                    type: FINISH_REQUEST,
                });
            })
            .catch((e) =>
                dispatch({
                    type: RESET_POST_FORM,
                    payload: { status: 'failed' },
                })
            );
    };
};
