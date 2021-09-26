import { useSelector } from 'react-redux';
import { depSelector } from '@/model/selector/department';

function useDepartment() {
    const departmentData = useSelector(depSelector);
    return departmentData;
}

export default useDepartment;
