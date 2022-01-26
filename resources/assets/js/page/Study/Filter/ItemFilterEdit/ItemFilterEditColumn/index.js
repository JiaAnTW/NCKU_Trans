import React from 'react';
import map from 'lodash/map';

import { EditItemIcon, EditItemContainer } from './style';
import FilterEditColumnTitle from './../../ItemFilter/ItemFilterColumn/title';

function ItemFilterEditColumn({ optionsArr }) {
    return (
        <div>
            <FilterEditColumnTitle optionsArr={optionsArr} />
            {map(optionsArr.options, (option) => (
                <EditItemContainer key={option.value}>
                    <EditItemIcon />
                    {option.name}
                </EditItemContainer>
            ))}
        </div>
    );
}

export default ItemFilterEditColumn;
