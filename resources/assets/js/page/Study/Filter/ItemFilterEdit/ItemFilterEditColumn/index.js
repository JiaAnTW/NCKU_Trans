import React from 'react';
import map from 'lodash/map';
import { AddItemButton, AddItemIcon } from '../style';

import {
    FilterEditColumnContainer,
    EditItemIcon,
    EditItemContainer,
} from './style';
import FilterEditColumnTitle from './../../ItemFilter/ItemFilterColumn/title';

function ItemFilterEditColumn({ optionsArr }) {
    return (
        <FilterEditColumnContainer>
            <div>
                <FilterEditColumnTitle optionsArr={optionsArr} />
                {map(optionsArr.options, (option) => (
                    <EditItemContainer key={option.value}>
                        <EditItemIcon />
                        {option.name}
                    </EditItemContainer>
                ))}
            </div>
            <AddItemButton key={`${optionsArr.type}-btn`}>
                <AddItemIcon />
                新增項目
            </AddItemButton>
        </FilterEditColumnContainer>
    );
}

export default ItemFilterEditColumn;
