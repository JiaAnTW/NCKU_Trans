import React from 'react';
import { DetailItemLayout, TypeText, ValueText } from './style';

function DetailItem({ type, value }) {
    return (
        <DetailItemLayout>
            <TypeText>{type}</TypeText>
            <ValueText>{value}</ValueText>
        </DetailItemLayout>
    );
}

export default DetailItem;
