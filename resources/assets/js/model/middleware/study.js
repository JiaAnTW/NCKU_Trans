import Cookies from 'js-cookie';

import {
    ADD_STUDY_STAT,
    DELETE_STUDY_STAT,
    INIT_STUDY_STAT,
    STOP_EDIT_TAG,
    UPDATE_STUDY,
    UPDATE_STUDY_STAT,
} from '../action/study';
import { ADD_REQUEST, FINISH_REQUEST } from '../action/request';
import { INIT_STUDY } from '../action/study';
import { SET_STUDY_STATIS_OPTIONS } from '../action/post';

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

export const fetchStudy = ({ id, num = 0 }) => {
    return (dispatch) => {
        fetch(`/api/get/study?from=${id}&num=${num}`)
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: UPDATE_STUDY,
                    payload: { data },
                });
            })
            .catch((e) => console.error('錯誤: ', e));
    };
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
                dispatch({ type: SET_STUDY_STATIS_OPTIONS, payload: data });
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

export const initStudyAdmin = ({ num = 0 }) => {
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch(`/api/get/study/all?num=${num}`, {
            method: 'GET',
            headers: new Headers({
                Authorization: 'Bearer ' + Cookies.get('adminToken'),
            }),
        })
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
            .catch((e) => console.error('錯誤: ', e));
    };
};

export const fetchStudyAdmin = ({ id, num = 0 }) => {
    return (dispatch) => {
        fetch(`/api/get/study/all?from=${id}&num=${num}`, {
            method: 'GET',
            headers: new Headers({
                Authorization: 'Bearer ' + Cookies.get('adminToken'),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: UPDATE_STUDY,
                    payload: { data },
                });
            })
            .catch((e) => console.error('錯誤: ', e));
    };
};

export const updateStudyConfirm = (id, confirm) => {
    const body = { id, confirm };
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch(`/api/patch/study?id=${id}`, {
            method: 'PATCH',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('adminToken'),
            }),
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === FAILED) {
                    throw new Error('API call failed at backend');
                }
                dispatch({
                    type: FINISH_REQUEST,
                });
                dispatch(initStudyAdmin({ num: 30 }));
            })
            .catch((e) => console.error('錯誤: ', e));
    };
};

export const deleteStudy = (id) => {
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch(`/api/delete/study?id=${id}`, {
            method: 'DELETE',
            headers: new Headers({
                Authorization: 'Bearer ' + Cookies.get('adminToken'),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === FAILED) {
                    throw new Error('API call failed at backend');
                }
                dispatch({
                    type: FINISH_REQUEST,
                });
                dispatch(initStudyAdmin({ num: 30 }));
            })
            .catch((e) => console.error('錯誤: ', e));
    };
};

export const updateStudy = (data) => {
    const body = {
        title: data.title,
        content: data.content,
        category: data.category,
        statistic: data.statistic,
        year: data.year,
        confirm: data.confirm,
    };
    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch(`/api/post/study?id=${data.id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('adminToken'),
            }),
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === FAILED) {
                    throw new Error('API call failed at backend');
                }
                dispatch({
                    type: FINISH_REQUEST,
                });
                dispatch(initStudyAdmin({ num: 30 }));
            })
            .catch((e) => console.error('錯誤: ', e));
    };
};
