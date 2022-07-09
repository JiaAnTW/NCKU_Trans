import React from 'react';
import { useSelector } from 'react-redux';
import { useModalContext } from '~/utils';
import {
    StudyReaderContent,
    StudyReaderContext,
    StudyReaderLayout,
} from './style';
import Confirm from './Confirm';
import ChangeBtn from './ChangeBtn';
import Title from './Title';
import AdminAdvance from './AdminAdvance';
import StatisticBlock from './StatisticBlock';
import CategoryBlock from './CategoryBlock';
import {
    modalOnBeforeSelector,
    modalOnNextSelector,
} from '~/model/selector/modal';

function StudyReader({ isAdmin }) {
    const [{ id, title, postTime, statistic, category, content, confirm }] =
        useModalContext();
    const onBefore = useSelector(modalOnBeforeSelector);
    const onNext = useSelector(modalOnNextSelector);
    return (
        <StudyReaderLayout isAdmin={isAdmin}>
            {isAdmin && <Confirm id={id} isConfirmed={confirm === 'true'} />}
            {onBefore && <ChangeBtn direction="left" onClick={onBefore} />}
            <StudyReaderContent>
                <CategoryBlock id={id} isAdmin={isAdmin} data={category} />
                <Title title={title} postTime={postTime} />
                <StatisticBlock data={statistic} />
                <StudyReaderContext>{content}</StudyReaderContext>
                {isAdmin && <AdminAdvance id={id} />}
            </StudyReaderContent>
            {onNext && <ChangeBtn direction="right" onClick={onNext} />}
        </StudyReaderLayout>
    );
}

export default StudyReader;
