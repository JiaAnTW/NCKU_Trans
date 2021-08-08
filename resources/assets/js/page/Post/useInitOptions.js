import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDepartment } from '../../model/middleware/department';
import { fetchCollege } from '../../model/middleware/college';
import { useRequest } from '../../utils/index';

function useInitOptions() {
    const dispatch = useDispatch();
    const isFinishRequest = useRequest();

    useLayoutEffect(() => {
        dispatch(fetchDepartment());
        dispatch(fetchCollege());
    }, []);

    return isFinishRequest;
}

export default useInitOptions;
