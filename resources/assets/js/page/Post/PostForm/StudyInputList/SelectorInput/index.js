import React from 'react';
import { SelectorButton } from './style';
import {
    ADD_STATIS_DATA,
    DELETE_STATIS_DATA,
    SET_REMARK,
} from '~/model/action/post';
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
        selected.value
            ? addRemark()
            : dispatch({
                  type: DELETE_STATIS_DATA,
                  payload: {
                      index: props.index,
                      page: nextState.page,
                      keyName: nextState.keyName,
                  },
              });
    }, [props.keyName, props.page, selected]);
    const removeRemark = useCallback(() => {
        dispatch({
            type: SET_REMARK,
            payload: {
                keyName: props.keyName,
                value: '',
            },
        });
    }, [props]);

    const addRemark = useCallback(() => {
        dispatch({
            type: SET_REMARK,
            payload: {
                keyName: props.keyName,
                value: '請先清除輸入的資料，確認後再移除此項目',
            },
        });
    }, [props]);
    return (
        <SelectorButton
            selected={selected}
            onClick={selected ? deleteStaticData : addStaticData}
        >
            {(props.special_wording ? props.special_wording : '') +
                props.wording}
        </SelectorButton>
    );
}

export default SelectorInput;
