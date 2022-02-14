import React, { useCallback } from 'react';
import ToggleButton from './ToggleButton';
import map from 'lodash/map';
import { useDispatch } from 'react-redux';
import { TOGGLE_STATIS_DATA } from '~/model/action/post';

function ToggleButtonGroup(props) {
    const dispatch = useDispatch();
    const handleClick = useCallback(
        (data) => {
            dispatch({
                type: TOGGLE_STATIS_DATA,
                payload: {
                    elementArea: props.elementArea,
                    elementIndex: props.elementIndex,
                    ...data,
                },
            });
        },
        [dispatch, props.elementArea, props.elementIndex]
    );
    return map(props.value, (button) => {
        return (
            <ToggleButton
                key={button.title}
                handleClick={() => handleClick(button)}
                {...button}
            />
        );
    });
}

export default ToggleButtonGroup;
