import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalContextSelector } from '~/model/selector/modal';

import { SET_MODAL_CONTEXT } from '../../../../model/action/modal';

function useModalContext() {
    const dispatch = useDispatch();
    const modalContext = useSelector(modalContextSelector);

    const setModalContent = useCallback(
        (content) => {
            dispatch({ type: SET_MODAL_CONTEXT, payload: { content } });
        },
        [dispatch]
    );

    return [modalContext, setModalContent];
}

export default useModalContext;
