import React from 'react';
import { Statistic, StatisticItemContainer, Value } from './style';

function StatisticItem({ data }) {
    const items = [];
    for (const key in data) {
        items.push(
            <StatisticItemContainer>
                <Statistic>{key}</Statistic>
                <Value>{data[key]}</Value>
            </StatisticItemContainer>
        );
    }
    return items;
}

export default StatisticItem;
