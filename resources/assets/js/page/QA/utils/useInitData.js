import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchQA } from '../../../model/middleware/qa';
import { useRequest } from '../../../utils/index';

function useInitData() {
    const dispatch = useDispatch();
    const isFinishRequest = useRequest();

    useLayoutEffect(() => {
        dispatch(fetchQA());
    }, []);

    return isFinishRequest;
}

export default useInitData;
