import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMajor } from '../../../model/middleware/major';
import { fetchDepartment } from '../../../model/middleware/department';
import { fetchCollege } from '../../../model/middleware/college';
import { useRequest } from '../../../utils/index';

function useInitData() {
    const dispatch = useDispatch();
    const isFinishRequest = useRequest();

    useLayoutEffect(() => {
        dispatch(fetchMajor());
        dispatch(fetchDepartment());
        dispatch(fetchCollege());
    }, []);

    return isFinishRequest;
}

export default useInitData;
