import map from 'lodash/map';
import React, { forwardRef } from 'react';

import ItemFilterColumn from '../ItemFilter/ItemFilterColumn';
import ItemFilterEditColumn from './ItemFilterEditColumn';
import useItemFilter from '../useItemFilter';
import {
    ItemFilterEditContainer,
    FilterEditDisabledContainer,
    FilterDisabledText,
} from './style';

const generateChildren = (arr, index) => {
    return arr.type === 'year' ? (
        <div>
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
        </div>
    ) : (
        <ItemFilterEditColumn optionsArr={arr} />
    );
};

const ItemFilterEdit = forwardRef(() => {
    const filterObjArr = useItemFilter();

    return (
        <ItemFilterEditContainer>
            {map(filterObjArr, (arr, index) => {
                return generateChildren(arr, index);
            })}
        </ItemFilterEditContainer>
    );
});

export default ItemFilterEdit;
