import { INIT_DEPARTMENT } from '../action/department';
import { INIT_POST_OPTION } from '../action/post';
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
                    type: INIT_POST_OPTION,
                    payload: { departmentArr: data },
                });
                dispatch({
                    type: FINISH_REQUEST,
                });
            })
            .catch((e) => console.log('錯誤:', e));
    };
};
