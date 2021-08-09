import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartment } from '../../model/middleware/department';
import { fetchCollege } from '../../model/middleware/college';
import { useRequest } from '../../utils/index';

function useInitOptions() {
    const dispatch = useDispatch();
    const collegeData = useSelector((state) => state.college);
    const departmentData = useSelector((state) => state.in_maj);
    const isFinishRequest = useRequest();

    useLayoutEffect(() => {
        if (departmentData.length === 0) dispatch(fetchDepartment());
        if (collegeData.length === 0) dispatch(fetchCollege());
    }, []);

    return isFinishRequest;
}

export default useInitOptions;
