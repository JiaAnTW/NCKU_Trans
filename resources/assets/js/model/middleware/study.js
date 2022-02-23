import Cookies from 'js-cookie';

import {
    ADD_STUDY_STAT,
    DELETE_STUDY_STAT,
    INIT_STUDY_STAT,
    STOP_EDIT_TAG,
    UPDATE_STUDY_STAT,
} from '../action/study';
import { ADD_REQUEST, FINISH_REQUEST } from '../action/request';
import { INIT_STUDY } from '../action/study';

const FAILED = 'fail';

export const initStudy = ({ num = 0 }) => {
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch(`/api/get/study?num=${num}`)
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

export const fetchStudyType = () => {
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch(`/api/get/studyType`)
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: INIT_STUDY_STAT,
                    payload: { type: 'category', data },
                });
                dispatch({
                    type: FINISH_REQUEST,
                });
            })
            .catch((e) => console.log('錯誤:', e));
    };
};

export const fetchStudyStat = () => {
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch(`/api/get/studyStat`)
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: INIT_STUDY_STAT,
                    payload: { type: 'statInfo', data },
                });
                dispatch({
                    type: FINISH_REQUEST,
                });
            })
            .catch((e) => console.log('錯誤:', e));
    };
};

export const createStudyTypeOrStat = (option) => {
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });

        let url = getFilterOpsUrl('post', option.type);
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('adminToken'),
            }),
            body: JSON.stringify(option),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === FAILED) {
                    throw new Error('API call failed at backend');
                }
                dispatch({ type: STOP_EDIT_TAG });
                dispatch({
                    type: ADD_STUDY_STAT,
                    payload: {
                        type: option.type,
                        tag: {
                            ...option,
                            id: data.id,
                        },
                    },
                });
                dispatch({ type: FINISH_REQUEST });
            })
            .catch((e) => console.error('錯誤: ', e));
    };
};

export const updateStudyTypeOrStat = (option) => {
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });

        let url = getFilterOpsUrl('post', option.type);
        url += `?id=${option.id}`;

        fetch(url, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('adminToken'),
            }),
            body: JSON.stringify(option),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === FAILED) {
                    throw new Error('API call failed at backend');
                }
                dispatch({ type: STOP_EDIT_TAG });
                dispatch({
                    type: UPDATE_STUDY_STAT,
                    payload: {
                        type: option.type,
                        tag: option,
                    },
                });
                dispatch({ type: FINISH_REQUEST });
            })
            .catch((e) => console.error('錯誤: ', e));
    };
};

export const deleteStudyTypeOrStat = (option) => {
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });

        let url = getFilterOpsUrl('delete', option.type);
        url += `?id=${option.id}`;

        fetch(url, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('adminToken'),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === FAILED) {
                    throw new Error('API call failed at backend');
                }
                dispatch({ type: STOP_EDIT_TAG });
                dispatch({
                    type: DELETE_STUDY_STAT,
                    payload: {
                        type: option.type,
                        tagId: option.id,
                    },
                });
                dispatch({ type: FINISH_REQUEST });
            })
            .catch((e) => console.error('錯誤: ', e));
    };
};

const getFilterOpsUrl = (action, type) => {
    let typeName =
        type === 'category'
            ? 'studyType'
            : type === 'statInfo'
            ? 'studyStat'
            : undefined;

    if (typeName === undefined) {
        console.error('Unknown study filter option type');
        return;
    }

    return `/api/${action}/${typeName}`;
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
