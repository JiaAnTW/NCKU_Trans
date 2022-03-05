import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartment } from '../../model/middleware/department';
import { fetchCollege } from '../../model/middleware/college';
import { fetchStudyStat } from '../../model/middleware/study';
import { useRequest } from '../../utils/index';
import { depSelector } from '~/model/selector/department';
import { colSelector } from '~/model/selector/college';
import { itemFilterSelector } from '~/model/selector/study';

function useInitOptions() {
    const dispatch = useDispatch();
    const collegeData = useSelector(colSelector);
    const departmentData = useSelector(depSelector);
    const statInfoData = useSelector(itemFilterSelector).statInfo;
    const isFinishRequest = useRequest();

    useLayoutEffect(() => {
        if (departmentData.length === 0) dispatch(fetchDepartment());
        if (collegeData.length === 0) dispatch(fetchCollege());
        if (statInfoData.length === 0) dispatch(fetchStudyStat());
    }, []);

    return isFinishRequest;
}

export default useInitOptions;
