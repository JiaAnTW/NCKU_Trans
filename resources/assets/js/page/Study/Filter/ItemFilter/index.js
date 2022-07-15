import React, { forwardRef } from 'react';
import map from 'lodash/map';

import { ItemFilterContainer } from './style';
import ItemFilterColumn from './ItemFilterColumn';
import useItemFilter from '../useItemFilter';

const ItemFilter = forwardRef(({ isAdmin }) => {
    const filterObjArr = useItemFilter();

    return (
        <ItemFilterContainer>
            {map(filterObjArr, (arr, index) => (
                <ItemFilterColumn
                    key={arr.type ? arr.type : index}
                    optionsArr={arr}
                    isAdmin={isAdmin}
                />
            ))}
        </ItemFilterContainer>
    );
});

export default ItemFilter;
