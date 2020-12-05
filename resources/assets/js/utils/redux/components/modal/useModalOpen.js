import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { OPEN_MODAL, CLOSE_MODAL } from '../../../../model/action/modal';

function useModalOpen() {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.modal.isOpen);

    const setIsModalOpen = useCallback(
        (open) => {
            dispatch({ type: open ? OPEN_MODAL : CLOSE_MODAL });
        },
        [dispatch]
    );

    return [isModalOpen, setIsModalOpen];
}

export default useModalOpen;
