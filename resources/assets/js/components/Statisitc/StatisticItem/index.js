import React from 'react';
import { Type, Value } from './style';

function StatisticItem({ data }) {
    return (
        <>
            <Type>{data.name}</Type>
            <Value>{data.avg}</Value>
            <Value last={true}>{data.min}</Value>
        </>
    );
}

export default StatisticItem;
