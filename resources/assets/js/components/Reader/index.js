import React from 'react';
import { useSelector } from 'react-redux';
import { ReaderLayout, ReaderContent, ReaderText } from './style';
import ChangeBtn from './ChangeBtn';
import TitleBar from './TitleBar';
import DetailList from './DetailList';
import Confirm from './Confirm';
import AdvanceAdmin from './AdvanceAdmin';
import { useModalContext } from '~/utils';

function Reader({ isAdmin }) {
    const [props] = useModalContext();
    const onBefore = useSelector((state) => state.modal.onBefore);
    const onNext = useSelector((state) => state.modal.onNext);
    return (
        <ReaderLayout isAdmin={isAdmin}>
            <ChangeBtn direction="left" onClick={onBefore} />
            <ReaderContent>
                <TitleBar
                    type={props.type}
                    title={props.title}
                    subtitle={props.subtitle}
                />
                {isAdmin && <Confirm id={props.id} confirm={props.confirm} />}
                <DetailList value={props.tags} />
                <ReaderText>{props.content}</ReaderText>
                {isAdmin && <AdvanceAdmin id={props.id} />}
            </ReaderContent>
            <ChangeBtn direction="right" onClick={onNext} />
        </ReaderLayout>
    );
}
export default Reader;
