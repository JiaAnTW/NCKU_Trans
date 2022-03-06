import React, { useCallback, useContext } from 'react';
import { FilterState } from '../Context/FilterState';
import FilterContext from '../Context/FilterContext';

import EditTag from './EditTag';
import {
    ManageButtonContainer,
    StartManageIcon,
    StopManageIcon,
} from './style';

function getManageBtn(state) {
    return state === FilterState.NORMAL ? (
        <>
            <StartManageIcon />
            管理類別設定
        </>
    ) : (
        <>
            <StopManageIcon />
            取消管理
        </>
    );
}

function ItemFilterManagement() {
    const { filterState, setFilterState } = useContext(FilterContext);
    const handleClick = useCallback(() => {
        setFilterState((prev) => {
            if (prev === FilterState.NORMAL) return FilterState.MANAGE;
            else if (prev === FilterState.MANAGE) return FilterState.NORMAL;
        });
    }, [filterState, setFilterState]);

    if (
        filterState === FilterState.MODIFY ||
        filterState === FilterState.CREATE
    ) {
        return <EditTag />;
    } else {
        return (
            <ManageButtonContainer onClick={handleClick}>
                {getManageBtn(filterState)}
            </ManageButtonContainer>
        );
    }
}

export default ItemFilterManagement;
