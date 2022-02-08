import React, { useCallback } from 'react';
import Input from '~/page/Post/PostForm/InputList/PostInput';
import map from 'lodash/map';
import filter from 'lodash/filter';

function ToggleSpawnInput(props) {
    const controlButtonArr = props[0];
    const others = filter(props, (item) => {
        try {
            return item.keyName === 'other';
        } catch {}
    });
    return (
        <>
            <Input
                {...controlButtonArr}
                elementIndex={props.elementIndex}
                layer={'form_toggle_button'}
            />
            {map(controlButtonArr.value, (button, index) => {
                return button.value === true ? (
                    <Input
                        elementIndex={index}
                        layer={'form_toggle_input'}
                        key={button.id}
                        {...props[button.id]}
                    />
                ) : (
                    ''
                );
            })}
            {map(others, (other, index) => {
                return (
                    <Input
                        elementIndex={
                            index + Object.keys(controlButtonArr.value).length
                        }
                        layer={'form_toggle_input'}
                        key={index + Object.keys(controlButtonArr).length}
                        {...other}
                    />
                );
            })}
        </>
    );
}

export default ToggleSpawnInput;
