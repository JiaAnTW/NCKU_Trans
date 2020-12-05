import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SET_MODAL_CONTEXT } from '../../../../model/action/modal';

function useModalContext() {
    const dispatch = useDispatch();
    const modalContext = useSelector((state) => state.modal.context);

    const setModalContent = useCallback(
        (content) => {
            dispatch({ type: SET_MODAL_CONTEXT, payload: { content } });
        },
        [dispatch]
    );

    return [modalContext, setModalContent];
}

export default useModalContext;
