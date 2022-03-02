import React from 'react';
import { Statistic, StatisticItemContainer, Value } from './style';

function StatisticItem({ data }) {
    return (
        <StatisticItemContainer>
            <Statistic>{data['name']}</Statistic>
            <Value>{data['value']}</Value>
        </StatisticItemContainer>
    );
}

export default StatisticItem;
