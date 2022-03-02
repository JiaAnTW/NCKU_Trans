import React from 'react';
import StatisticItem from './StatisticItem';
import { StatisticContainer } from './style';

function StatisticBlock({ data }) {
    return (
        <StatisticContainer>
            {data.map((val) => (
                <StatisticItem key={val['id']} data={val} />
            ))}
        </StatisticContainer>
    );
}

export default StatisticBlock;
