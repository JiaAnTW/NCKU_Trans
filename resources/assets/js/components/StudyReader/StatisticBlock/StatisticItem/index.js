import React from 'react';
import { Statistic, StatisticItemContainer, Value } from './style';

function StatisticItem({ data: { statistic, value } }) {
    return (
        <StatisticItemContainer>
            <Statistic>{statistic}</Statistic>
            <Value>{value}</Value>
        </StatisticItemContainer>
    );
}

export default StatisticItem;
