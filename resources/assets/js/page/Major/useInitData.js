import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initMajor, fetchMajorAdmin } from '../../model/middleware/major';
import { fetchDepartment } from '../../model/middleware/department';
import { fetchCollege } from '../../model/middleware/college';
import { useRequest } from '../../utils/index';
import { CLEAN_FILTER } from '../../model/action/major';

function useInitData({ isAdmin, num }) {
    const dispatch = useDispatch();
    const isFinishRequest = useRequest();

    useEffect(() => {
        if (isAdmin) {
            dispatch(fetchMajorAdmin());
        } else {
            dispatch(initMajor({ num }));
        }
        dispatch(fetchDepartment());
        dispatch(fetchCollege());

        return () => {
            dispatch({ type: CLEAN_FILTER });
        };
    }, [isAdmin]);

    return isFinishRequest;
}

export default useInitData;
