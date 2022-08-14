import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_OTHER_STAT_DATA, SET_PENDING_SUBMIT } from '~/model/action/study';
import {
    DeleteBox,
    NameBox,
    ResetBox,
    Row,
    SelectBox,
    StudyIDBox,
    ValueBox,
} from '../style';
import { Input, PreviewButton } from './style';
import { ResetButton } from './style';
import { Link } from 'react-router-dom';
import CheckBox from '../CheckBox';
import { color } from '../../../../theme/global';

function colorController(pendingChange, pendingDelete) {
    if (pendingChange) return color.yellow;
    if (!pendingChange && pendingDelete) return color.red;
    return color.lightGray;
}

function RowList(props) {
    const {
        name,
        value,
        elementIndex,
        study_id,
        nextName,
        nextValue,
        pendingChange,
        pendingDelete,
        onFocus,
        ...replacingProps
    } = props;
    const dispatch = useDispatch();
    const handleChangeName = useCallback(
        (e) => {
            dispatch({
                type: SET_OTHER_STAT_DATA,
                payload: {
                    name: e.target.value,
                    value: nextValue,
                    elementIndex: elementIndex,
                },
            });
            handleFocus(e);
        },
        [dispatch, nextValue, elementIndex]
    );
    const handleChangeValue = useCallback(
        (e) => {
            dispatch({
                type: SET_OTHER_STAT_DATA,
                payload: {
                    name: nextName,
                    value: e.target.value,
                    elementIndex: elementIndex,
                },
            });
        },
        [dispatch, nextName, elementIndex]
    );
    const handleReset = useCallback(() => {
        dispatch({
            type: SET_OTHER_STAT_DATA,
            payload: {
                name: name,
                value: value,
                elementIndex: elementIndex,
            },
        });
    }, [dispatch, name, value, elementIndex]);
    const handlePendingModified = useCallback(
        (target) => () => {
            dispatch({
                type: SET_PENDING_SUBMIT,
                payload: { elementIndex: elementIndex, target: target },
            });
        },
        [dispatch, elementIndex]
    );
    const handleFocus = useCallback(
        (e) => {
            onFocus(elementIndex, e);
        },
        [elementIndex]
    );
    useEffect(() => {
        if (replacingProps.onFocusIndex === elementIndex)
            handleChangeName({
                target: { value: replacingProps.pendingReplace },
            });
    }, [handleChangeName, replacingProps.pendingReplace, elementIndex]);
    return (
        <Row color={colorController(pendingChange, pendingDelete)}>
            <NameBox>
                <Input
                    value={nextName}
                    onChange={handleChangeName}
                    onFocus={handleFocus}
                />
            </NameBox>
            <ValueBox>
                <Input value={nextValue} onChange={handleChangeValue} />
            </ValueBox>
            <StudyIDBox>
                <Link to={`/admin/study?id=${study_id}`}>
                    <PreviewButton />
                </Link>
            </StudyIDBox>
            <ResetBox>
                <ResetButton onClick={handleReset} />
            </ResetBox>
            <SelectBox>
                <CheckBox
                    isCheck={pendingChange}
                    onClick={handlePendingModified('pendingChange')}
                />
            </SelectBox>
            <DeleteBox>
                <CheckBox
                    isCheck={pendingDelete}
                    onClick={handlePendingModified('pendingDelete')}
                />
            </DeleteBox>
        </Row>
    );
}

export default RowList;
