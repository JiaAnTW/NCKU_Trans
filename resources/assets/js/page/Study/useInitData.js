import { useEffect, useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRequest } from '~/utils/index';
import { initStudyAdmin, initStudy } from '~/model/middleware/study';
import { fetchStudyStat, fetchStudyType } from '~/model/middleware/study';
import { SetNavSearchContext } from '~/components/NavLayout/NavSearchProvider';

function useInitData({ isAdmin, num }) {
    const dispatch = useDispatch();
    const isFinishRequest = useRequest();
    const setHandleSearch = useContext(SetNavSearchContext);

    const handleSearch = useCallback(
        (value) => {
            if (isAdmin) {
                dispatch(initStudyAdmin({ num, p: value }));
            } else {
                dispatch(initStudy({ num, p: value }));
            }
        },
        [isAdmin, dispatch, num]
    );

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
    }, [isAdmin, dispatch, num]);

    useEffect(() => {
        setHandleSearch(() => {
            return handleSearch;
        });
    }, [setHandleSearch]);

    return isFinishRequest;
}

export default useInitData;
