import React from 'react';
import Modal from 'react-modal';

import { ModalStyle } from './style';
import { useModalOpen } from '~/utils';
import { useDispatch } from 'react-redux';
import { CLEAR_MODAL_CONTEXT } from '~/model/action/modal';

function ReaderModal({ isAdmin, onClose, readerComponent: ReaderComponent }) {
    const [isModalOpen, setIsModalOpen] = useModalOpen();
    const dispatch = useDispatch();

    return (
        <Modal
            isOpen={isModalOpen}
            contentLabel="Minimal Modal Example"
            className="Modal"
            style={ModalStyle}
            overlayClassName="Overlay"
            onRequestClose={() => {
                setIsModalOpen(false);
                if (onClose) onClose();
            }}
            onAfterClose={() => {
                dispatch({ type: CLEAR_MODAL_CONTEXT });
            }}
        >
            {ReaderComponent && <ReaderComponent isAdmin={isAdmin} />}
        </Modal>
    );
}

Modal.setAppElement('body');
export default ReaderModal;
