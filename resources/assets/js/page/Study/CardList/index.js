import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { studyDataSelector } from '~/model/selector/study';
import StudyCard from '~/components/StudyCard';
import InfiniteScroll from '~/components/InfiniteScroll';
import useFetchData from './useFetchData';

import { ScrollableContainer } from './style';
import useCommentFlow from './useCommentFlow';

function CardsList({ isAdmin }) {
    const studyData = useSelector(studyDataSelector);
    const [overscanStopIndex, setOverscanStopIndex] = useState(0);
    useFetchData({ isAdmin, overscanStopIndex, num: 15 });
    useCommentFlow({ studyData });

    return (
        <ScrollableContainer>
            <InfiniteScroll
                data={studyData}
                setOverscanStopIndex={setOverscanStopIndex}
                ListItemComponent={StudyCard}
            />
        </ScrollableContainer>
    );
}
export default CardsList;
