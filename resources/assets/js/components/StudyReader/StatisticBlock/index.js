import React from 'react';
import StatisticItem from './StatisticItem';
import { StatisticContainer } from './style';

function StatisticBlock({ data }) {
    return (
        <StatisticContainer>
            {data.map((val, idx) => (
                <StatisticItem key={idx} data={val} />
            ))}
        </StatisticContainer>
    );
}

export default StatisticBlock;
