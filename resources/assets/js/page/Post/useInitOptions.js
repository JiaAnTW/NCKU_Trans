import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartment } from '../../model/middleware/department';
import { fetchCollege } from '../../model/middleware/college';
import { useRequest } from '../../utils/index';
import { depSelector } from '@/model/selector/department';
import { colSelector } from '@/model/selector/college';

function useInitOptions() {
    const dispatch = useDispatch();
    const collegeData = useSelector(colSelector);
    const departmentData = useSelector(depSelector);
    const isFinishRequest = useRequest();

    useLayoutEffect(() => {
        if (departmentData.length === 0) dispatch(fetchDepartment());
        if (collegeData.length === 0) dispatch(fetchCollege());
    }, []);

    return isFinishRequest;
}

export default useInitOptions;
