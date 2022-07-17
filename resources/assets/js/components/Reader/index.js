import React from 'react';
import { useSelector } from 'react-redux';
import { ReaderLayout, ReaderContent, ReaderText } from './style';
import ChangeBtn from './ChangeBtn';
import TitleBar from './TitleBar';
import DetailList from './DetailList';
import Confirm from './Confirm';
import AdvanceAdmin from './AdvanceAdmin';
import { useModalContext } from '~/utils';
import {
    modalOnBeforeSelector,
    modalOnNextSelector,
} from '~/model/selector/modal';

function Reader({ isAdmin }) {
    const [{ id, type, title, subtitle, tags, content, confirm }] =
        useModalContext();
    const onBefore = useSelector(modalOnBeforeSelector);
    const onNext = useSelector(modalOnNextSelector);

    return (
        <ReaderLayout isAdmin={isAdmin}>
            <ChangeBtn direction="left" onClick={onBefore} />
            <ReaderContent>
                <TitleBar type={type} title={title} subtitle={subtitle} />
                {isAdmin && <Confirm id={id} confirm={confirm} />}
                <DetailList value={tags} />
                <ReaderText>{content}</ReaderText>
                {isAdmin && <AdvanceAdmin id={id} />}
            </ReaderContent>
            <ChangeBtn direction="right" onClick={onNext} />
        </ReaderLayout>
    );
}
export default Reader;
