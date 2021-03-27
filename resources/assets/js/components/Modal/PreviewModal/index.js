import React from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import Divider from '@material-ui/core/Divider';
import { ModalStyle, PreviewLayout } from './style';
import Reader from '@/components/Reader';
import ControlArea from '@/components/Form/ControlArea';
import { useModalOpen } from '@/utils';

function PreviewModal(props) {
    const [isModalOpen, setIsModalOpen] = useModalOpen();
    const onConfirm = useSelector((state) => state.modal.onConfirm);

    return (
        <Modal
            isOpen={isModalOpen}
            contentLabel="Minimal Modal Example"
            className="Modal"
            style={ModalStyle}
            overlayClassName="Overlay"
            onRequestClose={() => {}}
        >
            <PreviewLayout>
                <h4>我是預覽文字</h4>
                <Divider />
                <Reader />
                <ControlArea
                    onNext={onConfirm}
                    onBefore={() => {
                        setIsModalOpen(false);
                    }}
                    nextText="確認送出"
                    beforeText="返回修改"
                />
            </PreviewLayout>
        </Modal>
    );
}

Modal.setAppElement('body');
export default PreviewModal;
