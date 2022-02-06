import React, { forwardRef } from 'react';
import map from 'lodash/map';
import styled from 'styled-components';

import ItemFilterColumn from '../ItemFilterColumn';
import useItemFilter from '../useItemFilter';

const ItemFilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 0;
`;

const ItemFilter = forwardRef(() => {
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
});

export default ItemFilter;
