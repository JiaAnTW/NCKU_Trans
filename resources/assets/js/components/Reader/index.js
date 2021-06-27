import React from 'react';
import { useSelector } from 'react-redux';
import Toggle from 'react-toggle';
import 'react-toggle/style.css'; // for ES6 modules
import { ReaderLayout, ReaderContent, ReaderText } from './style';
import ChangeBtn from './ChangeBtn';
import TitleBar from './TitleBar';
import DetailList from './DetailList';
import Confirm from './Confirm';
import { useModalContext } from '@/utils';

function Reader({ isAdmin }) {
    const [
        { id, type, title, subtitle, tags, content, confirm },
    ] = useModalContext();
    const onBefore = useSelector((state) => state.modal.onBefore);
    const onNext = useSelector((state) => state.modal.onNext);

    return (
        <ReaderLayout>
            <ChangeBtn direction="left" onClick={onBefore} />
            <ReaderContent>
                <TitleBar type={type} title={title} subtitle={subtitle} />
                {isAdmin && <Confirm id={id} confirm={confirm} />}
                <DetailList value={tags} />
                <ReaderText>{content.replace(/<br>/g, '\n')}</ReaderText>
            </ReaderContent>
            <ChangeBtn direction="right" onClick={onNext} />
        </ReaderLayout>
    );
}
export default Reader;
