import React, { useCallback, useContext } from 'react';
import { STATE } from '..';
import DropdownContext from '../DropdownContext';

import EditTag from './EditTag';
import {
    ManageButtonContainer,
    StartManageIcon,
    StopManageIcon,
} from './style';

function getManageBtn(state) {
    return state === STATE.NORMAL ? (
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
    const { state, setState } = useContext(DropdownContext);
    const handleClick = useCallback(() => {
        setState((prev) => {
            if (prev === STATE.NORMAL) return STATE.MANAGE;
            else if (prev === STATE.MANAGE) return STATE.NORMAL;
        });
    }, [state, setState]);

    if (state === STATE.MODIFY || state === STATE.CREATE) {
        return <EditTag />;
    } else {
        return (
            <ManageButtonContainer onClick={handleClick}>
                {getManageBtn(state)}
            </ManageButtonContainer>
        );
    }
}

export default ItemFilterManagement;
