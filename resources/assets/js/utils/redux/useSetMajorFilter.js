import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { SET_FILTER } from '../../model/action/major';

function useSetMajorFilter() {
    const dispatch = useDispatch();
    // 設定filter的函式
    return useCallback(
        (new_filter, type) => {
            dispatch({
                type: SET_FILTER,
                payload: {
                    type,
                    value: new_filter,
                },
            });
        },
        [dispatch]
    );
}

export default useSetMajorFilter;
