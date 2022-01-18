import React from 'react';
import { SelectorButton } from './style';
import { ADD_STATIS_DATA, DELETE_STATIS_DATA } from '~/model/action/post';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
function SelectorInput(props) {
    const dispatch = useDispatch();
    const type = useSelector((state) => state.post.type);
    const selected = useSelector(
        (state) => state.post.form[type][props.keyName]
    );
    const addStaticData = useCallback(() => {
        const nextState = { ...props };
        nextState.selected = true;
        dispatch({
            type: ADD_STATIS_DATA,
            payload: {
                index: props.index,
                page: nextState.page,
                keyName: nextState.keyName,
                value: nextState,
            },
        });
    }, [props.keyName, props.page]);
    const deleteStaticData = useCallback(() => {
        const nextState = { ...props };
        nextState.selected = false;
        dispatch({
            type: DELETE_STATIS_DATA,
            payload: {
                index: props.index,
                page: nextState.page,
                keyName: nextState.keyName,
            },
        });
    }, [props.keyName, props.page]);
    return (
        <SelectorButton onClick={selected ? deleteStaticData : addStaticData}>
            {(props.special_wording ? props.special_wording : '') +
                props.wording}
        </SelectorButton>
    );
}

export default SelectorInput;
