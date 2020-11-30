import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { fetchDepartment } from '../../model/middleware/department';

function useDepartment() {
    const dispatch = useDispatch();
    const departmentData = useSelector(state => state.department);

    useEffect(()=>{
        dispatch(fetchDepartment());
    },[]);

    return departmentData;
}

export default useDepartment;