import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { SET_ANNOOUNCE_ISSHOW } from '@/model/action/announcement';

export default function useSetAnnIsShow() {
    const dispatch = useDispatch();

    const setAnnIsshow = useCallback(
        (isShowNext) => {
            dispatch({
                type: SET_ANNOOUNCE_ISSHOW,
                payload: { value: isShowNext },
            });
        },
        [dispatch]
    );

    return setAnnIsshow;
}
