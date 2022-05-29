import React, { useCallback } from 'react';
import { ListContainer } from './style';

function InfiniteScroll({ data, setOverscanStopIndex, ListItemComponent }) {
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
            itemSize={160}
            width={600}
            onItemsRendered={onItemsRendered}
            itemData={data}
        >
            {ListItemComponent}
        </ListContainer>
    );
}

export default InfiniteScroll;
