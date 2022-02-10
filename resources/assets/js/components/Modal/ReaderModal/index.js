import React from 'react';
import Modal from 'react-modal';

import { ModalStyle } from './style';
import Reader from '../../Reader';
import { useModalOpen } from '~/utils';
import { useHistory } from 'react-router';
import StudyReader from '~/components/StudyReader';

function ReaderModal({ isAdmin, onClose }) {
    const [isModalOpen, setIsModalOpen] = useModalOpen();
    const history = useHistory();

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
        >
            {/^\/major/i.test(history.location.pathname) ? (
                <Reader isAdmin={isAdmin} />
            ) : (
                <StudyReader isAdmin={isAdmin} />
            )}
        </Modal>
    );
}

Modal.setAppElement('body');
export default ReaderModal;
