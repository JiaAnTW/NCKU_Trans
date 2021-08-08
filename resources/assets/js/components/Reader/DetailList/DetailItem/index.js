import React from 'react';
import { DetailItemLayout, TypeText, ValueText } from './style';

function valueMiddleware(type, value) {
    if (type !== '申請結果') return value;
    if (value === 'false') {
        return '未通過';
    }
    return '通過';
}

function DetailItem({ type, value }) {
    return (
        <DetailItemLayout value={value} type={type}>
            <TypeText>{type}</TypeText>
            <ValueText>{valueMiddleware(type, value)}</ValueText>
        </DetailItemLayout>
    );
}

export default DetailItem;
