import { useDepartment } from '@/utils/index';

export default function useDepFilter(college) {
    const departmentData = useDepartment();

    return departmentData.filter((element) => element.college === college);
}
