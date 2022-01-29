import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { FixedSizeGrid as Grid } from 'react-window';

import { majorDisplaySelector } from '~/model/selector/major';
import { useParentSize } from '~/utils';

import useCommentFlow from './useCommentFlow';
import useCardSize from './useCardSize';
import useCard from './useCard';

function CardsList() {
    const majorData = useSelector(majorDisplaySelector);
    useCommentFlow({ majorData: majorData });

    const containerRef = useRef(undefined);
    const { parentWidth, parentHeight } = useParentSize(containerRef);

    const { cardWidth, cardHeight } = useCardSize();
    const columnCount =
        parentWidth <= cardWidth ? 1 : Math.floor(parentWidth / cardWidth);
    const rowCount = Math.ceil(majorData.length / columnCount);

    const Card = useCard(majorData, columnCount);

    return (
        <div ref={containerRef}>
            <Grid
                columnCount={columnCount}
                columnWidth={cardWidth}
                height={parentHeight}
                rowCount={rowCount}
                rowHeight={cardHeight}
                width={parentWidth}
            >
                {Card}
            </Grid>
        </div>
    );
}
export default CardsList;
