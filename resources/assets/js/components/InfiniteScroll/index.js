import React, { useCallback } from 'react';
import { ListContainer } from './style';
import TransCard from './TransCard';

function InfiniteScroll({ data, setOverscanStopIndex }) {
    const onItemsRendered = useCallback(
        ({ overscanStopIndex }) => {
            setOverscanStopIndex(overscanStopIndex);
        },
        [setOverscanStopIndex]
    );

    return (
        <ListContainer
            height={650}
            itemCount={data.length}
            itemSize={154}
            width={600}
            onItemsRendered={onItemsRendered}
            itemData={data}
        >
            {TransCard}
        </ListContainer>
    );
}

export default InfiniteScroll;
