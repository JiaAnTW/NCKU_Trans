import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalIsOpenSelector } from '~/model/selector/modal';

import { OPEN_MODAL, CLOSE_MODAL } from '../../../../model/action/modal';

function useModalOpen() {
    const dispatch = useDispatch();
    const isModalOpen = useSelector(modalIsOpenSelector);

    const setIsModalOpen = useCallback(
        (open) => {
            dispatch({ type: open ? OPEN_MODAL : CLOSE_MODAL });
        },
        [dispatch]
    );

    return [isModalOpen, setIsModalOpen];
}

export default useModalOpen;
