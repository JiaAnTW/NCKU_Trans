import React from 'react';
import { useSelector } from 'react-redux';
import Toggle from 'react-toggle';
import { ReaderLayout, ReaderContent, ReaderText } from './style';
import ChangeBtn from './ChangeBtn';
import TitleBar from './TitleBar';
import DetailList from './DetailList';
import { useModalContext } from '@/utils';

function Reader(props) {
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
                <DetailList value={tags} />
                <ReaderText>{content}</ReaderText>
            </ReaderContent>
            <ChangeBtn direction="right" onClick={onNext} />
        </ReaderLayout>
    );
}
export default Reader;
