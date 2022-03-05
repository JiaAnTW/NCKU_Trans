import React from 'react';
import {
    ColumnContainer,
    DataType,
    DataTypeRemark,
    FixHeightContainer,
    Title,
} from './style';

function TypeNameColumn({ dataArray }) {
    return (
        <ColumnContainer>
            <Title> 資料類別 </Title>
            <FixHeightContainer>
                <DataType>title</DataType>
                <DataTypeRemark>remark</DataTypeRemark>
            </FixHeightContainer>
            <FixHeightContainer>
                <DataType>title</DataType>
                <DataTypeRemark>remark</DataTypeRemark>
            </FixHeightContainer>
        </ColumnContainer>
    );
}

export default TypeNameColumn;
