import map from 'lodash/map';
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import { adminActionSelector } from '~/model/selector/study';
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
    const filterManageState = useSelector(adminActionSelector);

    return (
        <ItemFilterEditContainer>
            {map(filterObjArr, (arr, index) => {
                return arr.type === 'year' ? (
                    <div key={arr.type ? arr.type : index}>
                        <FilterEditDisabledContainer>
                            {!filterManageState.isEditTag && (
                                <FilterDisabledText>
                                    學年自動產生
                                    <br />
                                    無法編輯
                                </FilterDisabledText>
                            )}
                        </FilterEditDisabledContainer>
                        <ItemFilterColumn
                            key={arr.type ? arr.type : index}
                            optionsArr={arr}
                        />
                    </div>
                ) : (
                    <div key={arr.type ? arr.type : index}>
                        {filterManageState.isEditTag && (
                            <FilterEditDisabledContainer />
                        )}
                        <ItemFilterEditColumn optionsArr={arr} />
                    </div>
                );
            })}
        </ItemFilterEditContainer>
    );
});

export default ItemFilterEdit;
