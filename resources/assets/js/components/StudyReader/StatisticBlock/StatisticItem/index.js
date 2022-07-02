import React from 'react';
import { Statistic, StatisticItemContainer, Value } from './style';

function StatisticItem({ data }) {
    const { name, value, isOther } = data;
    return (
        <StatisticItemContainer>
            <Statistic>
                {isOther && '其他:'}
                {name}
            </Statistic>
            <Value>{value}</Value>
        </StatisticItemContainer>
    );
}

export default StatisticItem;
