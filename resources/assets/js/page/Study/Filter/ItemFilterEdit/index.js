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

const ItemFilterEdit = forwardRef(() => {
    const filterObjArr = useItemFilter();

    return (
        <ItemFilterEditContainer>
            {map(filterObjArr, (arr, index) => {
                return arr.type === 'year' ? (
                    <div key={arr.type ? arr.type : index}>
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
                    <ItemFilterEditColumn
                        key={arr.type ? arr.type : index}
                        optionsArr={arr}
                    />
                );
            })}
        </ItemFilterEditContainer>
    );
});

export default ItemFilterEdit;
