import Cookies from 'js-cookie';

import {
    ADD_STUDY_STAT,
    DELETE_STUDY_STAT,
    INIT_STUDY_STAT,
    STOP_EDIT_TAG,
    UPDATE_STUDY,
    UPDATE_STUDY_STAT,
    SET_STUDY_FILTER,
} from '../action/study';
import { ADD_REQUEST, FINISH_REQUEST } from '../action/request';
import { INIT_STUDY } from '../action/study';
import { SET_STUDY_STATIS_OPTIONS } from '../action/post';

import { filterParamsReducer } from '../selector/study';

const FAILED = 'fail';

export const initStudy = ({ id, num = 0, p, category, statInfo, year }) => {
    return (dispatch) => {
        let url = `/api/get/study?from=${id ? id : ''}&num=${num}`;
        url += p ? `&p=${p}` : '';
        url +=
            category && category.length > 0
                ? `&categoryFilter=${category.join(',')}`
                : '';
        url +=
            statInfo && statInfo.length > 0
                ? `&statFilter=${statInfo.join(',')}`
                : '';
        url += year && year.length > 0 ? `&year=${year.join(',')}` : '';
        dispatch({ type: ADD_REQUEST });
        fetch(url)
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

export const fetchStudy = ({ id, num = 0, p }) => {
    return (dispatch, getState) => {
        const { study } = getState();
        const { filter } = study;
        const { category, statInfo, year } = filterParamsReducer(filter);

        let url = `/api/get/study?from=${id ? id : ''}&num=${num}`;
        url += p ? `&p=${p}` : '';
        url +=
            category && category.length > 0
                ? `&categoryFilter=${category.join(',')}`
                : '';
        url +=
            statInfo && statInfo.length > 0
                ? `&statFilter=${statInfo.join(',')}`
                : '';
        url += year && year.length > 0 ? `&year=${year.join(',')}` : '';
        fetch(url)
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

export const setStudyTypeOrStat = ({ payload }) => {
    return (dispatch, getState) => {
        const { tagType, tagId, checked } = payload;
        const { study } = getState();
        const { filter } = study;

        const filterNext = filterParamsReducer(filter);
        if (checked) {
            filterNext[tagType].push(tagId);
        } else {
            const index = filterNext[tagType].findIndex((id) => id === tagId);
            filterNext[tagType].splice(index);
        }

        const { category, statInfo, year } = filterNext;
        dispatch({ type: SET_STUDY_FILTER, payload });
        dispatch(initStudy({ num: 30, category, statInfo, year }));
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

export const initStudyAdmin = ({
    id,
    num = 0,
    p,
    category,
    statInfo,
    year,
}) => {
    let url = `/api/get/study/all?from=${id ? id : ''}&num=${num}`;
    url += p ? `&p=${p}` : '';
    url +=
        category && category.length > 0
            ? `&categoryFilter=${category.join(',')}`
            : '';
    url +=
        statInfo && statInfo.length > 0
            ? `&statFilter=${statInfo.join(',')}`
            : '';
    url += year && year.length > 0 ? `&year=${year.join(',')}` : '';

    return (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        fetch(url, {
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

export const fetchStudyAdmin = ({ id, num = 0, p }) => {
    return (dispatch, getState) => {
        const { study } = getState();
        const { filter } = study;
        const { category, statInfo, year } = filterParamsReducer(filter);

        let url = `/api/get/study/all?from${id ? id : ''}&num=${num}`;
        url += p ? `&p=${p}` : '';
        url +=
            category && category.length > 0
                ? `&categoryFilter=${category.join(',')}`
                : '';
        url +=
            statInfo && statInfo.length > 0
                ? `&statFilter=${statInfo.join(',')}`
                : '';
        url += year && year.length > 0 ? `&year=${year.join(',')}` : '';

        fetch(url, {
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
        major: data.rawData.major,
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
