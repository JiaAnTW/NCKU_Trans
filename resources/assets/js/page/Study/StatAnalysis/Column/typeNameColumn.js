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
            {dataArray.map((data) => (
                <FixHeightContainer>
                    <DataType>{data}</DataType>
                    <DataTypeRemark>remark</DataTypeRemark>
                </FixHeightContainer>
            ))}
        </ColumnContainer>
    );
}

export default TypeNameColumn;
