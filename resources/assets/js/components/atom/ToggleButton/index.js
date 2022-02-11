import React from 'react';
import { ToggleBtn } from './style';

function ToggleButton(props) {
    const { title, handleClick, value } = props;
    return (
        <ToggleBtn
            selected={value !== undefined && value}
            onClick={handleClick}
        >
            {title}
        </ToggleBtn>
    );
}

export default ToggleButton;
