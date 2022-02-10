import { ADD_REQUEST, FINISH_REQUEST } from '../action/request';
import { INIT_STUDY } from '../action/study';

export const initStudy = ({ num = 0 }) => {
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch('http://localhost:8000' + `/api/get/study?from=0&num=${num}`)
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: INIT_STUDY,
                    payload: { data },
                });
                dispatch({
                    type: FINISH_REQUEST,
                });
            })
            .catch((e) => console.log('錯誤:', e));
    };
};

export const fetchStudy = ({ from = 0, num = 0 }) => {
    return (dispatch) => {};
};

export const fetchStudyAdmin = () => {
    return (dispatch) => {
        // dispatch({ type: ADD_REQUEST });
        // fetch('http://localhost:8000' + '/api/get/study/all', {
        //     method: 'GET',
        //     headers: new Headers({
        //         Authorization: 'Bearer ' + Cookies.get('adminToken'),
        //     }),
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         dispatch({
        //             type: INIT_STUDY,
        //             payload: { data },
        //         });
        //         dispatch({
        //             type: FINISH_REQUEST,
        //         });
        //     })
        //     .catch(e => {
        //         location.href = '/#/admin/login';
        //     });
    };
};

export const updateStudy = (id, confirm) => {
    const body = { id, confirm };
    return (dispatch) => {
        // dispatch({ type: ADD_REQUEST });
        // fetch('http://localhost:8000' + `/api/patch/study/${id.toString()}`, {
        //     method: 'PATCH',
        //     headers: new Headers({
        //         'Content-Type': 'application/json',
        //         Authorization: 'Bearer ' + Cookies.get('adminToken'),
        //     }),
        //     body: JSON.stringify(body),
        // })
        //     .then((data) => {
        //         dispatch({
        //             type: FINISH_REQUEST,
        //         });
        //         dispatch(fetchStudyAdmin());
        //     })
        //     .catch((e) => {
        //         location.href = '/#/admin/login';
        //     });
    };
};

export const deleteStudy = (id) => {
    const body = { id };
    return (dispatch) => {
        // dispatch({ type: ADD_REQUEST });
        // fetch('http://localhost:8000' + `/api/post/study/${id.toString()}`, {
        //     method: 'DELETE',
        //     headers: new Headers({
        //         'Content-Type': 'application/json',
        //         Authorization: 'Bearer ' + Cookies.get('adminToken'),
        //     }),
        //     body: JSON.stringify(body),
        // })
        //     .then(data => {
        //         dispatch({
        //             type: FINISH_REQUEST,
        //         });
        //         dispatch(fetchMajorAdmin());
        //     })
        //     .catch(e => {
        //         location.href = '/#/admin/login';
        //     });
    };
};
