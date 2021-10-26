import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDepartment } from '../../model/middleware/department';
import { fetchCollege } from '../../model/middleware/college';
import { useRequest } from '../../utils/index';

function useInitData() {
    const dispatch = useDispatch();
    const isFinishRequest = useRequest();

    useEffect(() => {
        dispatch(fetchDepartment());
        dispatch(fetchCollege());
    }, []);

    return isFinishRequest;
}

export default useInitData;
