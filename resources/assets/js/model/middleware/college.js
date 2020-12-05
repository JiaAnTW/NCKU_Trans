import { INIT_COLLEGE } from '../action/college';

export const fetchCollege = () => {
    return (dispatch) => {
        fetch('/api/get/college')
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: INIT_COLLEGE,
                    payload: { data },
                });
            })
            .catch((e) => console.log('錯誤:', e));
    };
};
