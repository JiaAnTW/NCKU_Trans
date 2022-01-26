import React from 'react';
import { EditTagIcon, EditTagContainer, StopEditIcon } from './style';

function EditTagButton({ toggleEdit, isEditing }) {
    return (
        <EditTagContainer onClick={() => toggleEdit(!isEditing)}>
            {isEditing ? (
                <>
                    <StopEditIcon />
                    取消管理
                </>
            ) : (
                <>
                    <EditTagIcon />
                    管理標籤
                </>
            )}
        </EditTagContainer>
    );
}

export default EditTagButton;
