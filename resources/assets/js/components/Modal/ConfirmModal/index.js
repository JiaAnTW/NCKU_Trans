import React from 'react';
import Modal from 'react-modal';
import Divider from '@material-ui/core/Divider';
import { ModalStyle, PreviewLayout, PreviewTitle } from './style';
import ControlArea from '@/components/Form/ControlArea';
import { useModalOpen } from '@/utils';

function ConfirmModal({ title, children, onConfirm }) {
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
            }}
        >
            <PreviewLayout>
                <PreviewTitle>{title}</PreviewTitle>
                <Divider />
                {children}
                <ControlArea
                    onNext={onConfirm}
                    onBefore={() => {
                        setIsModalOpen(false);
                    }}
                    nextText="確認送出"
                    beforeText="返回修改"
                    enableCancel
                />
            </PreviewLayout>
        </Modal>
    );
}

Modal.setAppElement('body');
export default ConfirmModal;
