import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { fetchCollege } from '../../model/middleware/college';

function useCollege() {
    const dispatch = useDispatch();
    const collegeData = useSelector(state => state.college);

    useEffect(()=>{
        dispatch(fetchCollege());
    },[]);

    return collegeData;
}

export default useCollege;