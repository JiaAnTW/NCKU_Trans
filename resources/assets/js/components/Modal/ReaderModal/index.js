import React from 'react';
import Modal from 'react-modal';

import { ModalStyle } from './style';
import Reader from '../../Reader';
import { useModalOpen } from '~/utils';
import { changeHeaderInfo } from '~/utils/seo/header';
import trans from '~/utils/transition';
import wording from '~/wording/general';

function ReaderModal({ isAdmin }) {
    const [isModalOpen, setIsModalOpen] = useModalOpen();

    return (
        <Modal
            isOpen={isModalOpen}
            contentLabel="Minimal Modal Example"
            className="Modal"
            style={ModalStyle}
            overlayClassName="Overlay"
            onRequestClose={() => {
                setIsModalOpen(false);
                changeHeaderInfo(
                    trans(wording['websiteTitle'], {
                        websiteTitleShort: wording['websiteTitleShort'],
                        schoolName: wording['schoolName'],
                    }),
                    wording['description']
                );
            }}
        >
            <Reader isAdmin={isAdmin} />
        </Modal>
    );
}

Modal.setAppElement('body');
export default ReaderModal;
