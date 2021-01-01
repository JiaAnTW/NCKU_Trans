import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMajor, fetchMajorAdmin } from '../../model/middleware/major';
import { fetchDepartment } from '../../model/middleware/department';
import { fetchCollege } from '../../model/middleware/college';
import { useRequest } from '../../utils/index';

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
    }, [isAdmin]);

    return isFinishRequest;
}

export default useInitData;
