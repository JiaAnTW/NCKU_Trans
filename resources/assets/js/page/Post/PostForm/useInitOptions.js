import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDepartment } from '../../../model/middleware/department';
import { useRequest } from '../../../utils/index';

function useInitOptions() {
    const dispatch = useDispatch();
    const isFinishRequest = useRequest();

    useLayoutEffect(() => {
        dispatch(fetchDepartment());
    }, []);

    return isFinishRequest;
}

export default useInitOptions;
