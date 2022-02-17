import React from 'react';
import { useSelector } from 'react-redux';

import { adminActionSelector } from '~/model/selector/study';
import EditTag from './EditTag';
import {
    StartManageIcon,
    ManageButtonContainer,
    StopManageIcon,
} from './style';

const getManageBtn = (isManaging) => {
    return isManaging ? (
        <>
            <StopManageIcon />
            取消管理
        </>
    ) : (
        <>
            <StartManageIcon />
            管理標籤
        </>
    );
};

function ItemFilterManagement({ toggleManage, toggleEditTag, isManaging }) {
    const filterManageState = useSelector(adminActionSelector);

    return (
        <>
            {filterManageState.isEditTag ? (
                <EditTag toggleEditTag={toggleEditTag} />
            ) : (
                <ManageButtonContainer
                    onClick={() => toggleManage(!isManaging)}
                >
                    {getManageBtn(isManaging)}
                </ManageButtonContainer>
            )}
        </>
    );
}

export default ItemFilterManagement;
