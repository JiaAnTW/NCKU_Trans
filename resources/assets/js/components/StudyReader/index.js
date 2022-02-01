import React from 'react';
import { useSelector } from 'react-redux';
import { useModalContext } from '~/utils';
import {
    BadgeList,
    StatisticBadge,
    StudyReaderContent,
    StudyReaderContext,
    StudyReaderLayout,
} from './style';
import './style.css';
import Confirm from './Confirm';
import ChangeBtn from './ChangeBtn';
import Title from './Title';
import AdminAdvance from './AdminAdvance';

function StudyReader({ isAdmin }) {
    const [{ id, type, title, subtitle, tags, content, confirm }] =
        useModalContext();
    const onBefore = useSelector((state) => state.modal.onBefore);
    const onNext = useSelector((state) => state.modal.onNext);
    return (
        <StudyReaderLayout isAdmin={isAdmin}>
            {isAdmin && <Confirm id={id} isConfirmed={confirm === 'true'} />}
            {onBefore && <ChangeBtn direction="left" onClick={onBefore} />}
            <StudyReaderContent>
                <BadgeList>
                    {['海外交換', '行政'].map((val, index) => (
                        <StatisticBadge
                            value={val}
                            key={index}
                        ></StatisticBadge>
                    ))}
                </BadgeList>
                <Title
                    title="普渡大學交換紀錄"
                    postTime="109（發文時間：111/01/01）"
                />
                <div style={{ height: 50 }}>Statistic</div>
                <StudyReaderContext>{content}</StudyReaderContext>
                {isAdmin && <AdminAdvance />}
            </StudyReaderContent>
            {onNext && <ChangeBtn direction="right" onClick={onNext} />}
        </StudyReaderLayout>
    );
}

export default StudyReader;
