import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Modal from 'react-modal';

import EqualizerIcon from '@material-ui/icons/Equalizer';

import IconButton, {
    ModalStyle,
    Container,
    H4,
    Hr,
    ModalCloseButton,
    ModalHeader,
} from './style';
import { useMedia } from '~/utils';

const root = document.getElementById('root');

function StatisticButton({ onClick }) {
    return (
        <IconButton onClick={onClick}>
            <EqualizerIcon />
        </IconButton>
    );
}

export default function StatisticControl({ children }) {
    const device = useMedia();
    const [open, setOpen] = useState(false);

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return device === 'PC' ? (
        children
    ) : (
        <>
            {createPortal(<StatisticButton onClick={handleOpen} />, root)}{' '}
            <Modal
                isOpen={open}
                contentLabel="Minimal Modal Example"
                className="Modal"
                style={ModalStyle}
                overlayClassName="Overlay"
                onRequestClose={handleClose}
            >
                <Container>
                    <ModalHeader>
                        <H4>統計數據</H4>

                        <ModalCloseButton onClick={handleClose}>
                            x
                        </ModalCloseButton>
                    </ModalHeader>
                    <Hr />
                    {children}
                </Container>
            </Modal>
        </>
    );
}

Modal.setAppElement('body');
