import { FormGroup } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CANCEL_EDIT_TAG } from '~/model/action/study';

import { EditTagContainer, ToolsContainer, ToolButton } from './style';
import { adminActionSelector } from '~/model/selector/study';

function EditTag() {
    const filterManageState = useSelector(adminActionSelector);
    const dispatch = useDispatch();

    const cancelEditTag = () => {
        dispatch({ type: CANCEL_EDIT_TAG });
    };

    return (
        <EditTagContainer>
            <FormGroup>{JSON.stringify(filterManageState.tag)}</FormGroup>
            <ToolsContainer>
                <ToolButton action="delete">刪除</ToolButton>
                <ToolButton action="cancel" onClick={cancelEditTag}>
                    返回
                </ToolButton>
                <ToolButton action="send">送出</ToolButton>
            </ToolsContainer>
        </EditTagContainer>
    );
}

export default EditTag;
