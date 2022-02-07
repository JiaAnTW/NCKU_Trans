import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import SelectElement from '@material-ui/core/Select';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { STOP_EDIT_TAG, UPDATE_TAG } from '~/model/action/study';
import InputLabel from '~/components/atom/InputLabel';
import Option from '~/components/atom/Option/index';
import {
    deleteItemFilterOption,
    createItemFilterOption,
    updateItemFilterOption,
} from '~/model/middleware/study';
import { adminActionSelector } from '~/model/selector/study';
import {
    EditTagContainer,
    ToolsContainer,
    ToolButton,
    useStyles,
    MenuPropsStyle,
    FormControlGroup,
    InputFieldWithPrefix,
    BetweenSymbol,
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

const statTypes = [
    {
        text: '整數',
        value: 'integer',
    },
    {
        text: '小數',
        value: 'decimal',
    },
];

function EditTag() {
    const { action, tag } = useSelector(adminActionSelector);
    const dispatch = useDispatch();
    const classes = useStyles();

    const deleteTag = () => {
        dispatch(deleteItemFilterOption(tag));
    };

    const cancelEditTag = () => {
        dispatch({ type: STOP_EDIT_TAG });
    };

    const updateTag = () => {
        if (action === 'create') {
            dispatch(createItemFilterOption(tag));
        } else if (action === 'update') {
            dispatch(updateItemFilterOption(tag));
        }
    };

    const onChangeTag = (tag) => {
        dispatch({ type: UPDATE_TAG, payload: { tag } });
    };

    // todo: integer / decimal type check
    const getTextFieldWithPrefix = (type) => {
        return (
            <InputFieldWithPrefix>
                {type}
                <TextField
                    value={tag[type]}
                    className={classes.numberInput}
                    inputProps={{ type: 'number' }}
                    InputLabelProps={{ shrink: false }}
                    onChange={(e) => onChangeTag({ [type]: e.target.value })}
                />
            </InputFieldWithPrefix>
        );
    };

    return (
        <EditTagContainer>
            <form className={classes.root}>
                <TextField
                    fullWidth
                    value={tag.value}
                    label={getDataNameLabel(tag.type)}
                    onChange={(e) => onChangeTag({ value: e.target.value })}
                />
                {tag.type === 'statInfo' && (
                    <FormGroup row>
                        <FormControlGroup className={classes.formControl}>
                            <InputLabel>數據類別</InputLabel>
                            <SelectElement
                                value={tag.dataType}
                                onChange={(e) =>
                                    onChangeTag({ dataType: e.target.value })
                                }
                                MenuProps={{ style: MenuPropsStyle }}
                                className={classes.select}
                            >
                                {statTypes.map((item) => (
                                    <Option {...item} key={item.value}>
                                        {item.text}
                                    </Option>
                                ))}
                            </SelectElement>
                        </FormControlGroup>
                        <FormControlGroup className={classes.formControl}>
                            <InputLabel>資料範圍</InputLabel>
                            {getTextFieldWithPrefix('max')}
                            <BetweenSymbol> ~ </BetweenSymbol>
                            {getTextFieldWithPrefix('min')}
                        </FormControlGroup>
                    </FormGroup>
                )}
            </form>
            <ToolsContainer>
                {action !== 'create' && (
                    <ToolButton action="delete" onClick={deleteTag}>
                        刪除
                    </ToolButton>
                )}
                <ToolButton action="cancel" onClick={cancelEditTag}>
                    返回
                </ToolButton>
                <ToolButton action="send" onClick={updateTag}>
                    送出
                </ToolButton>
            </ToolsContainer>
        </EditTagContainer>
    );
}

export default EditTag;
