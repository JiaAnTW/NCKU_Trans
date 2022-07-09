import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { FixedSizeGrid as Grid } from 'react-window';

import { majorDisplaySelector } from '~/model/selector/major';
import { useParentSize } from '~/utils';

import useCommentFlow from './useCommentFlow';
import useCardSize from './useCardSize';
import useCard from './useCard';
import { CardListContainer } from './style';

function CardsList() {
    const majorData = useSelector(majorDisplaySelector);
    useCommentFlow({ majorData: majorData });

    const containerRef = useRef(undefined);
    const { parentWidth, parentHeight } = useParentSize(containerRef);

    const { cardWidth, cardHeight } = useCardSize();
    const columnCount =
        parentWidth <= cardWidth ? 1 : Math.floor(parentWidth / cardWidth);
    const rowCount = Math.ceil(majorData.length / columnCount) + 2; // +2 is for padding-bottom

    const Card = useCard(columnCount);

    return (
        <CardListContainer ref={containerRef}>
            <Grid
                columnCount={columnCount}
                columnWidth={cardWidth}
                height={parentHeight}
                rowCount={rowCount}
                rowHeight={cardHeight}
                width={parentWidth}
                itemData={majorData}
            >
                {Card}
            </Grid>
        </CardListContainer>
    );
}
export default CardsList;
