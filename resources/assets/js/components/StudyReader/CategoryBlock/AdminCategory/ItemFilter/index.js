import React, { forwardRef } from 'react';
import map from 'lodash/map';

import { ItemFilterContainer } from './style';
import ItemFilterColumn from './ItemFilterColumn';
import useItemFilter from '../useItemFilter';

function ItemFilter() {
    const filterObjArr = useItemFilter();

    return (
        <ItemFilterContainer>
            {map(filterObjArr, (arr, index) => (
                <ItemFilterColumn
                    key={arr.type ? arr.type : index}
                    optionsArr={arr}
                />
            ))}
        </ItemFilterContainer>
    );
}

export default ItemFilter;
