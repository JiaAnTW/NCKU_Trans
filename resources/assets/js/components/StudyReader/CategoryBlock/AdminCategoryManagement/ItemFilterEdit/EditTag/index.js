import TextField from '@material-ui/core/TextField';
import React, { useContext } from 'react';

import { FilterState } from '../../Context/FilterState';
import FilterContext from '../../Context/FilterContext';
import { useDispatch } from 'react-redux';
import {
    EditTagContainer,
    ToolsContainer,
    ToolButton,
    useStyles,
} from './style';
import {
    createStudyTypeOrStat,
    deleteStudyTypeOrStat,
    updateStudyTypeOrStat,
} from '~/model/middleware/study';
import { useModalOpen } from '~/utils';

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
    const classes = useStyles();
    const [, setIsModalOpen] = useModalOpen();
    const { filterState } = useContext(FilterContext);
    const { setFilterState, tagEditing, setTagEditing } =
        useContext(FilterContext);
    const dispatch = useDispatch();

    const deleteTag = () => {
        setIsModalOpen(false);
        dispatch(
            deleteStudyTypeOrStat({ id: tagEditing.id, type: 'category' })
        );
    };
    const cancelEditTag = () => {
        setFilterState(FilterState.MANAGE);
    };
    const updateTag = () => {
        setIsModalOpen(false);
        if (filterState === FilterState.CREATE) {
            dispatch(
                createStudyTypeOrStat({
                    name: tagEditing.name,
                    type: 'category',
                })
            );
        } else {
            dispatch(
                updateStudyTypeOrStat({
                    id: tagEditing.id,
                    name: tagEditing.name,
                    type: 'category',
                })
            );
        }
    };

    return (
        <EditTagContainer>
            <form className={classes.root}>
                <TextField
                    fullWidth
                    value={tagEditing.name}
                    label={getDataNameLabel('category')}
                    onChange={(e) =>
                        setTagEditing({
                            id: tagEditing.id,
                            name: e.target.value,
                        })
                    }
                />
            </form>
            <ToolsContainer>
                {filterState !== FilterState.CREATE && (
                    <ToolButton action="delete" onClick={deleteTag}>
                        刪除
                    </ToolButton>
                )}
                <ToolButton action="cancel" onClick={cancelEditTag}>
                    返回
                </ToolButton>
                <ToolButton action="send" onClick={() => updateTag()}>
                    送出
                </ToolButton>
            </ToolsContainer>
        </EditTagContainer>
    );
}

export default EditTag;
