import React from 'react';
import { useSelector } from 'react-redux';
import Toggle from 'react-toggle';
import Modal from 'react-modal';
import { ReaderLayout, ModalStyle, ReaderContent, ReaderText } from './style';
import ChangeBtn from './ChangeBtn';
import TitleBar from './TitleBar';
import DetailList from './DetailList';
import { useWindowWidth, useModalOpen, useModalContext } from '@/utils/index';

function Reader(props) {
    const [isModalOpen, setIsModalOpen] = useModalOpen();
    const [
        { id, type, title, subtitle, tags, content, confirm },
    ] = useModalContext();
    const onBefore = useSelector((state) => state.modal.onBefore);
    const onNext = useSelector((state) => state.modal.onNext);

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
            <ReaderLayout>
                <ChangeBtn direction="left" onClick={onBefore} />
                <ReaderContent>
                    <TitleBar type={type} title={title} subtitle={subtitle} />
                    <DetailList value={tags} />
                    <ReaderText>{content}</ReaderText>
                </ReaderContent>
                <ChangeBtn direction="right" onClick={onNext} />
            </ReaderLayout>
        </Modal>
    );
}

Modal.setAppElement('body');
export default Reader;
