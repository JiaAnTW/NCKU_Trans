import map from 'lodash/map';
import React, { forwardRef, useContext } from 'react';

import ItemFilterEditColumn from './ItemFilterEditColumn';
import useItemFilter from '../useItemFilter';
import { ItemFilterEditContainer, FilterEditDisabledContainer } from './style';
import FilterContext from '../Context/FilterContext';
import { FilterState } from '../Context/FilterState';

function ItemFilterEdit() {
    const filterObjArr = useItemFilter();
    const { filterState } = useContext(FilterContext);

    return (
        <ItemFilterEditContainer>
            {map(filterObjArr, (arr, index) => {
                return (
                    <div key={arr.type ? arr.type : index}>
                        {filterState === FilterState.MODIFY && (
                            <FilterEditDisabledContainer />
                        )}
                        <ItemFilterEditColumn optionsArr={arr} />
                    </div>
                );
            })}
        </ItemFilterEditContainer>
    );
}

export default forwardRef(ItemFilterEdit);
