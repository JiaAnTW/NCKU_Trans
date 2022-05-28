import React from 'react';
import { Type, Value } from './style';

function StatisticItem({ data }) {
    return (
        <>
            <Type>{data.name}</Type>
            <Value>{data.avg !== undefined ? data.avg : '暫無資料'}</Value>
            <Value last={true}>
                {data.min !== undefined ? data.min : '暫無資料'}
            </Value>
        </>
    );
}

export default StatisticItem;
