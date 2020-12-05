import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { SET_FILTER } from '../../model/action/major';

function useSetMajorFliter() {
    const dispatch = useDispatch();
    // 設定fliter的函式
    return useCallback(
        (new_fliter, type) => {
            dispatch({
                type: SET_FILTER,
                payload: {
                    type,
                    value: new_fliter,
                },
            });
        },
        [dispatch]
    );
}

export default useSetMajorFliter;
