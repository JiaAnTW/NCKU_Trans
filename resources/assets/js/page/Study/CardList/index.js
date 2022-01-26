import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { studyDataSelector } from '~/model/selector/study';
import InfiniteScroll from '~/components/InfiniteScroll';
import useFetchData from './useFetchData';

import { ScrollableContainer } from './style';

function CardsList({ isAdmin }) {
    const studyData = useSelector(studyDataSelector);
    const [overscanStopIndex, setOverscanStopIndex] = useState(0);
    useFetchData({ overscanStopIndex, num: 15, isAdmin });
    //useCommentFlow({ majorData: majorData });

    return (
        <ScrollableContainer>
            <InfiniteScroll
                data={studyData}
                setOverscanStopIndex={setOverscanStopIndex}
            />
        </ScrollableContainer>
    );
}
export default CardsList;
