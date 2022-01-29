import React, { useCallback } from 'react';
import TransCard from '~/components/TransCard';

export default function useCard(majorData, columnCount) {
    const Card = useCallback(
        ({ columnIndex, rowIndex, style }) => {
            const index = columnIndex + columnCount * rowIndex;
            // Must return an JSX element, or react window will crash
            if (index >= majorData.length) return <></>;

            const itemData = majorData[index];
            return (
                <div style={style}>
                    <TransCard itemData={itemData} index={0} />
                </div>
            );
        },
        [majorData, columnCount]
    );

    return Card;
}
