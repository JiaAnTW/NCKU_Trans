import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { fetchQA } from '../../model/middleware/qa';

function useQA() {
    const dispatch = useDispatch();
    const QAData = useSelector(state => state.QA.data);

    useEffect(()=>{
        dispatch(fetchQA());
    },[]);

    return QAData;
}

export default useQA;