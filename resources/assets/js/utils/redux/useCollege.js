import { useSelector } from 'react-redux';
import { colSelector } from '@/model/selector/college';

function useCollege() {
    const collegeData = useSelector(colSelector);
    return collegeData;
}

export default useCollege;
