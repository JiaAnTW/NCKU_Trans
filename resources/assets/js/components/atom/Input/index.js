import React from 'react';
import { InputElement } from './style';

function Input(props) {
    return (
        <InputElement
            value={props.value}
            {...props.elementAttrs}
            onChange={props.onChange}
        />
    );
}

export default Input;
