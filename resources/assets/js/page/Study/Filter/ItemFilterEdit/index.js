import map from 'lodash/map';
import React, { forwardRef } from 'react';

import ItemFilterColumn from '../ItemFilter/ItemFilterColumn';
import ItemFilterEditColumn from './ItemFilterEditColumn';
import useItemFilter from '../useItemFilter';
import {
    ItemFilterEditContainer,
    FilterEditColumnContainer,
    AddItemButton,
    AddItemIcon,
    FilterEditDisabledContainer,
    FilterDisabledText,
} from './style';

const generateChildren = (arr, index) => {
    return arr.type === 'year' ? (
        <>
            <FilterEditDisabledContainer>
                <FilterDisabledText>
                    學年自動產生
                    <br />
                    無法編輯
                </FilterDisabledText>
            </FilterEditDisabledContainer>
            <ItemFilterColumn
                key={arr.type ? arr.type : index}
                optionsArr={arr}
            />
        </>
    ) : (
        <>
            <ItemFilterEditColumn optionsArr={arr} isEdit={true} />
            <AddItemButton key={arr.type ? `${arr.type}-btn` : `${index}-btn`}>
                <AddItemIcon />
                新增項目
            </AddItemButton>
        </>
    );
};

const ItemFilterEdit = forwardRef(() => {
    const filterObjArr = useItemFilter();

    return (
        <ItemFilterEditContainer>
            {map(filterObjArr, (arr, index) => (
                <FilterEditColumnContainer
                    key={arr.type ? arr.type : index}
                    type={arr.type ? arr.type : index}
                >
                    {generateChildren(arr, index)}
                </FilterEditColumnContainer>
            ))}
        </ItemFilterEditContainer>
    );
});

export default ItemFilterEdit;
