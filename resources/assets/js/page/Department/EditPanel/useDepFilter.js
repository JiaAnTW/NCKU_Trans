import { useSelector } from 'react-redux';
import { depSelector } from '~/model/selector/department';

export default function useDepFilter(college) {
    const departmentData = useSelector(depSelector);

    return departmentData.filter((element) => element.college === college);
}
