import React, { useCallback } from 'react';
import TransCard from '~/components/TransCard';

export default function useCard(columnCount) {
    const Card = useCallback(
        ({ data, columnIndex, rowIndex, style }) => {
            const index = columnIndex + columnCount * rowIndex;
            // Must return a JSX element, or react window will crash
            if (!data || index >= data.length) return <></>;

            const itemData = data[index];
            return (
                <div style={style}>
                    <TransCard itemData={itemData} index={index} />
                </div>
            );
        },
        [columnCount]
    );

    return Card;
}
