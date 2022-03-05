import React from 'react';
import { ColumnContainer, Number, Title } from './style';

function DataColumn({ title, dataArray }) {
    return (
        <ColumnContainer>
            <Title> {title} </Title>
            <Number>123</Number>
            <Number>456</Number>
        </ColumnContainer>
    );
}

export default DataColumn;
