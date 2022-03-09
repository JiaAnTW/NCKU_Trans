import React from 'react';
import {
    ColumnContainer,
    DataType,
    DataTypeRemark,
    FixHeightContainer,
    Number,
    Title,
} from './style';

function DataColumn({ title, dataArray }) {
    return (
        <ColumnContainer>
            <Title> {title} </Title>
            {dataArray.map((data) => (
                <Number>{data}</Number>
            ))}
        </ColumnContainer>
    );
}

export default DataColumn;
