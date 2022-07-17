import React from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import Divider from '@material-ui/core/Divider';
import { ModalStyle, PreviewLayout, PreviewTitle } from './style';
import ControlArea from '~/components/Form/ControlArea';
import { useModalOpen } from '~/utils';
import { modalOnConfirmSelector } from '~/model/selector/modal';

function PreviewModal({ readerComponent: Reader }) {
    const [isModalOpen, setIsModalOpen] = useModalOpen();
    const onConfirm = useSelector(modalOnConfirmSelector);

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
                <PreviewTitle>
                    請確認填寫的內容，送出之後就無法修改歐!
                </PreviewTitle>
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
