import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMajor, fetchMajorAdmin } from '../../model/middleware/major';
import { fetchDepartment } from '../../model/middleware/department';
import { fetchCollege } from '../../model/middleware/college';
import { useRequest } from '../../utils/index';
import { CLEAN_FILTER } from '../../model/action/major';

function useInitData(isAdmin) {
    const dispatch = useDispatch();
    const isFinishRequest = useRequest();

    useLayoutEffect(() => {
        if (isAdmin) {
            dispatch(fetchMajorAdmin());
        } else {
            dispatch(fetchMajor());
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
