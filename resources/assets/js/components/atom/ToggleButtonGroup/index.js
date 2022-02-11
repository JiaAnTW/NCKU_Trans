import React, { useCallback } from 'react';
import ToggleButton from '../ToggleButton';
import map from 'lodash/map';
import { useDispatch } from 'react-redux';
import { TOGGLE_STATIS_DATA } from '~/model/action/post';

function ToggleButtonGroup(props) {
    const dispatch = useDispatch();
    const handleClick = useCallback(
        (data, index) => {
            dispatch({
                type: TOGGLE_STATIS_DATA,
                payload: {
                    ...data,
                    index: index,
                    layer: props.layer ? props.layer : 'base',
                },
            });
        },
        [dispatch, props.layer]
    );
    return map(props.value, (button, index) => {
        return (
            <ToggleButton
                key={button.title}
                handleClick={() => handleClick(button, parseInt(index))}
                {...button}
            />
        );
    });
}

export default ToggleButtonGroup;
