import React, { useCallback } from 'react';
import { GroupBox } from './style';
import PostInput from '../InputList/PostInput';
import { useDispatch } from 'react-redux';
import { TOGGLE_STATIS_DATA } from '~/model/action/post';
import map from 'lodash/map';

function ToggleButtonGroup({ value }) {
    const dispatch = useDispatch();
    const handleClick = useCallback(
        (index, value) => {
            dispatch({
                type: TOGGLE_STATIS_DATA,
                payload: {
                    index: index,
                    value: value,
                },
            });
        },
        [dispatch, TOGGLE_STATIS_DATA]
    );
    return (
        <GroupBox>
            {map(value, (button) => {
                return (
                    <PostInput
                        key={button.keyName}
                        handleClick={handleClick}
                        {...button}
                    />
                );
            })}
        </GroupBox>
    );
}

export default ToggleButtonGroup;
