import { useState, useLayoutEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ADD_REQUEST, FINISH_REQUEST } from '@/model/action/request';
import { fetchAnnouncement } from '@/model/middleware/announcement';
import { useRequest } from '@/utils/index';

export default function useInitAdminAnn() {
    const dispatch = useDispatch();
    const isFinishRequest = useRequest();

    useLayoutEffect(() => {
        dispatch({ type: ADD_REQUEST });
        dispatch(
            fetchAnnouncement(() => {
                dispatch({ type: FINISH_REQUEST });
            })
        );
    }, [dispatch]);

    return isFinishRequest;
}
