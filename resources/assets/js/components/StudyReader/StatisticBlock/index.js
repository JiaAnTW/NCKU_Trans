import React from 'react';
import StatisticItem from './StatisticItem';
import { StatisticContainer } from './style';

function StatisticBlock({ data }) {
    return (
        <StatisticContainer>
            {data.map((v, i) => (
                <StatisticItem key={i} data={v} />
            ))}
        </StatisticContainer>
    );
}

export default StatisticBlock;
