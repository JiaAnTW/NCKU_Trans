import React from 'react';
import Input from '~/page/Post/PostForm/InputList/PostInput';
import map from 'lodash/map';

function ToggleSpawnInput(props) {
    const controlButtonArr = props[0];
    return (
        <>
            <Input {...controlButtonArr} elementIndex={props.elementIndex} />
            {map(controlButtonArr.value, (button, index) => {
                return button.value === true ? (
                    <Input
                        elementIndex={index}
                        key={button.id}
                        {...props[button.id]}
                    />
                ) : (
                    ''
                );
            })}
        </>
    );
}

export default ToggleSpawnInput;
