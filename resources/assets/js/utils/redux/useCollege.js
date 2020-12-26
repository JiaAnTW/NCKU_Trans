import { useSelector } from 'react-redux';

function useCollege() {
    const collegeData = useSelector((state) => state.college);
    return collegeData;
}

export default useCollege;
