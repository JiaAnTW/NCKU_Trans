import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import map from 'lodash/map';
import { AddItemButton, AddItemIcon } from '../style';

import {
    FilterEditColumnContainer,
    EditItemIcon,
    EditItemContainer,
} from './style';
import FilterEditColumnTitle from '../../ItemFilter/ItemFilterColumn/title';
import FilterContext from '../../Context/FilterContext';
import { FilterState } from '../../Context/FilterState';

function ItemFilterEditColumn({ optionsArr }) {
    const dispatch = useDispatch();
    const { filterState, setFilterState, setTagEditing } =
        useContext(FilterContext);

    const editTag = (type, option) => {
        setTagEditing(option);
        setFilterState(FilterState.MODIFY);
    };

    const createTag = (type) => {
        setTagEditing({ id: '', name: '' });
        setFilterState(FilterState.CREATE);
    };

    return (
        <FilterEditColumnContainer>
            <div>
                <FilterEditColumnTitle optionsArr={optionsArr} />
                {map(optionsArr.options, (option) => (
                    <EditItemContainer key={option.id}>
                        <EditItemIcon
                            onClick={() => editTag(optionsArr.type, option)}
                        />
                        {option.name}
                    </EditItemContainer>
                ))}
            </div>
            <AddItemButton onClick={() => createTag(optionsArr.type)}>
                <AddItemIcon />
                新增項目
            </AddItemButton>
        </FilterEditColumnContainer>
    );
}

export default ItemFilterEditColumn;
