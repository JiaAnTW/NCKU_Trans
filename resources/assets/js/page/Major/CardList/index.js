import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useCommentFlow from './useCommentFlow';
import { majorDisplaySelector } from '~/model/selector/major';
import InfiniteScroll from '~/components/InfiniteScroll';
import useFetchData from './useFetchData';

function CardsList({ isAdmin }) {
    const majorData = useSelector(majorDisplaySelector);
    const [overscanStopIndex, setOverscanStopIndex] = useState(0);
    useFetchData({ overscanStopIndex, num: 15, isAdmin });
    useCommentFlow({ majorData: majorData });

    return (
        <InfiniteScroll
            data={majorData}
            setOverscanStopIndex={setOverscanStopIndex}
        />
    );
}
export default CardsList;
