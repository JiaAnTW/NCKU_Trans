import { INIT_QA } from '../action/qa';
import { ADD_REQUEST, FINISH_REQUEST } from '../action/request';

export const fetchQA = () => {
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch('/api/get/major_QA')
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: INIT_QA,
                    payload: { data },
                });
                dispatch({
                    type: FINISH_REQUEST,
                });
            })
            .catch((e) => console.log('錯誤:', e));
    };
};
