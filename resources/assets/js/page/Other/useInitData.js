import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOtherStatAdmin } from '~/model/middleware/study';
import { useRequest } from '~/utils';
import { fetchStudyStat } from '~/model/middleware/study';

function useInitData() {
    const dispatch = useDispatch();
    const isFinishRequest = useRequest();

    useEffect(() => {
        dispatch(getOtherStatAdmin());
        dispatch(fetchStudyStat());
    }, [dispatch]);

    return isFinishRequest;
}

export default useInitData;
