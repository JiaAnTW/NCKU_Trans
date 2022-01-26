import React from 'react';
import EditTag from './EditTag';
import {
    StartManageIcon,
    ManageButtonContainer,
    StopManageIcon,
} from './style';

const generateManageBtn = (isManaging) => {
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

function ItemFilterManagement({
    toggleManage,
    toggleEditTag,
    isManaging,
    isEditingTag,
}) {
    return (
        <>
            {isEditingTag ? (
                <EditTag toggleEditTag={toggleEditTag} />
            ) : (
                <ManageButtonContainer
                    onClick={() => toggleManage(!isManaging)}
                >
                    {generateManageBtn(isManaging)}
                </ManageButtonContainer>
            )}
        </>
    );
}

export default ItemFilterManagement;
