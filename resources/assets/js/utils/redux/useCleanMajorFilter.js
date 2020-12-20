import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { CLEAN_FILTER } from '../../model/action/major';

function useCleanMajorFilter() {
    const dispatch = useDispatch();
    // 清空filter的函式
    return useCallback(() => {
        dispatch({
            type: CLEAN_FILTER,
        });
    }, [dispatch]);
}

export default useCleanMajorFilter;
