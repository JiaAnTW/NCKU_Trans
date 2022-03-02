import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useSelector } from 'react-redux';

import { adminActionSelector } from '~/model/selector/study';
import useEditFilterContext from '~/utils/redux/components/study/useEditFilterContext';
import StatInput from './statInput';
import {
    EditTagContainer,
    ToolsContainer,
    ToolButton,
    useStyles,
} from './style';

const getDataNameLabel = (type) => {
    switch (type) {
        case 'category':
            return '類別名稱';
        case 'statInfo':
            return '數據名稱';
        default:
            return '名稱';
    }
};

function EditTag() {
    const { action, tag } = useSelector(adminActionSelector);
    const classes = useStyles();
    const { deleteTag, cancelEditTag, updateTag, onChangeTag } =
        useEditFilterContext();

    return (
        <EditTagContainer>
            <form className={classes.root}>
                <TextField
                    fullWidth
                    value={tag.name}
                    label={getDataNameLabel(tag.type)}
                    onChange={(e) => onChangeTag({ name: e.target.value })}
                />
                {tag.type === 'statInfo' && <StatInput />}
            </form>
            <ToolsContainer>
                {action !== 'create' && (
                    <ToolButton action="delete" onClick={() => deleteTag(tag)}>
                        刪除
                    </ToolButton>
                )}
                <ToolButton action="cancel" onClick={cancelEditTag}>
                    返回
                </ToolButton>
                <ToolButton
                    action="send"
                    onClick={() => updateTag(tag, action)}
                >
                    送出
                </ToolButton>
            </ToolsContainer>
        </EditTagContainer>
    );
}

export default EditTag;
