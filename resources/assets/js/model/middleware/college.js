import { INIT_COLLEGE } from '../action/college';
import { INIT_POST_OPTION_COLLEGE } from '../action/post';
import { ADD_REQUEST, FINISH_REQUEST } from '../action/request';

export const fetchCollege = () => {
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch('/api/get/college')
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
