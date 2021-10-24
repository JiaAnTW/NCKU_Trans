import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { SET_ANNOOUNCE_ISSHOWED } from '@/model/action/announcement';

export default function usesetAnnIsShowed() {
    const dispatch = useDispatch();

    const setAnnIsShowed = useCallback(
        (isShowNext) => {
            dispatch({
                type: SET_ANNOOUNCE_ISSHOWED,
                payload: { value: isShowNext },
            });
        },
        [dispatch]
    );

    return setAnnIsShowed;
}
