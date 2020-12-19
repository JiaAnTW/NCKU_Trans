import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
    SET_MODAL_ON_BEFORE,
    SET_MODAL_ON_NEXT,
} from '../../../../model/action/modal';

function useSetModalFlow() {
    const dispatch = useDispatch();

    const setModalOnBefore = useCallback(
        (onBefore) => {
            dispatch({ type: SET_MODAL_ON_BEFORE, payload: { onBefore } });
        },
        [dispatch]
    );

    const setModalOnNext = useCallback(
        (onNext) => {
            dispatch({ type: SET_MODAL_ON_NEXT, payload: { onNext } });
        },
        [dispatch]
    );

    return [setModalOnBefore, setModalOnNext];
}

export default useSetModalFlow;
