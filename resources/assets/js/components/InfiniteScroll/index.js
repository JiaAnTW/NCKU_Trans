import React, { useCallback, useRef } from 'react';

import { useParentSize } from '~/utils';

import { ListContainer } from './style';

function InfiniteScroll({ data, setOverscanStopIndex, ListItemComponent }) {
    const containerRef = useRef(undefined);
    const { parentWidth, parentHeight } = useParentSize(containerRef);

    const onItemsRendered = useCallback(
        ({ overscanStopIndex }) => {
            setOverscanStopIndex(overscanStopIndex);
        },
        [setOverscanStopIndex]
    );

    return (
        <div ref={containerRef}>
            <ListContainer
                height={parentHeight}
                itemCount={data.length}
                itemSize={160}
                width={parentWidth - 10}
                onItemsRendered={onItemsRendered}
                itemData={data}
            >
                {ListItemComponent}
            </ListContainer>
        </div>
    );
}

export default InfiniteScroll;
