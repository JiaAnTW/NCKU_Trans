import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchQA } from '../../model/middleware/qa';

function useQA({ isNeedFetch }) {
    const dispatch = useDispatch();
    const QAData = useSelector((state) => state.QA.data);

    useEffect(() => {
        if (isNeedFetch) {
            dispatch(fetchQA());
        }
    }, [isNeedFetch]);

    return QAData;
}

export default useQA;
