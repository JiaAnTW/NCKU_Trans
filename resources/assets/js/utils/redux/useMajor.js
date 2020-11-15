import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { fetchMajor } from '../../model/middleware/major';

function useMajor() {
    const dispatch = useDispatch();
    const majorData = useSelector(state => state.major.data);

    useEffect(()=>{
        dispatch(fetchMajor());
    },[]);

    return majorData;
}

export default useMajor;