import React, { forwardRef, useContext } from 'react';
import map from 'lodash/map';

import { ItemFilterContainer, ButonContainer, StyledButton } from './style';
import ItemFilterColumn from './ItemFilterColumn';
import useItemFilter from '../useItemFilter';
import { useDispatch } from 'react-redux';
import { useModalContext, useModalOpen } from '~/utils';
import DropdownContext from '../DropdownContext';
import { updateStudy } from '~/model/middleware/study';

function ItemFilter() {
    const filterObjArr = useItemFilter();
    const [, setIsModalOpen] = useModalOpen();
    const { context } = useContext(DropdownContext);
    const [modalContext] = useModalContext();
    const dispatch = useDispatch();
    const handleClick = () => {
        setIsModalOpen(false);
        dispatch(updateStudy({ ...modalContext, category: context }));
    };

    return (
        <>
            <ItemFilterContainer>
                {map(filterObjArr, (arr, index) => (
                    <ItemFilterColumn
                        key={arr.type ? arr.type : index}
                        optionsArr={arr}
                    />
                ))}
            </ItemFilterContainer>
            <ButonContainer>
                <StyledButton onClick={handleClick}>送出</StyledButton>
            </ButonContainer>
        </>
    );
}

export default ItemFilter;
