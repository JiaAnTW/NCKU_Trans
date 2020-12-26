import { useSelector } from 'react-redux';

function useDepartment() {
    const departmentData = useSelector((state) => state.in_maj);
    return departmentData;
}

export default useDepartment;
