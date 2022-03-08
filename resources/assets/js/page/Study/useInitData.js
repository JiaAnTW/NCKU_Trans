import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRequest } from '../../utils/index';
import { initStudyAdmin, initStudy } from '~/model/middleware/study';
import { fetchStudyStat, fetchStudyType } from '../../model/middleware/study';

function useInitData({ isAdmin, num }) {
    const dispatch = useDispatch();
    const isFinishRequest = useRequest();

    useEffect(() => {
        dispatch(fetchStudyType());
        dispatch(fetchStudyStat());
    }, [dispatch]);

    useEffect(() => {
        if (isAdmin) {
            dispatch(initStudyAdmin({ num }));
        } else {
            dispatch(initStudy({ num }));
        }
    }, [isAdmin, dispatch]);

    return isFinishRequest;
}

export default useInitData;
