import { STOP_EDIT_TAG } from '../action/study';
import { ADD_REQUEST, FINISH_REQUEST } from '../action/request';
import { INIT_STUDY } from '../action/study';

export const createItemFilterOption = (option) => {
    return (dispatch) => {
        dispatch({ type: STOP_EDIT_TAG });
        // TODO: fetch api to create option from backend
        console.log('TODO: fetch api to create option from backend');
        option =
            option.type === 'category'
                ? { type: option.type, value: option.value }
                : option;
        console.log(option);
    };
};

export const updateItemFilterOption = (option) => {
    return (dispatch) => {
        dispatch({ type: STOP_EDIT_TAG });
        // TODO: fetch api to update option from backend
        console.log('TODO: fetch api to update option from backend');
        console.log(option);
    };
};

export const deleteItemFilterOption = (option) => {
    return (dispatch) => {
        dispatch({ type: STOP_EDIT_TAG });
        // TODO: fetch api to delete option from backend
        console.log('TODO: fetch api to delete option from backend');
        console.log(option);
    };
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
