import React, { useCallback } from 'react';
import { ToggleBtn } from './style';

function ToggleButton(props) {
    const {
        specialWord,
        wording,
        isPreventDefault,
        onClick,
        spawn,
        spawnParent,
    } = props;
    const handleClick = useCallback((parent, spawn) => {
        onClick(parent, spawn);
    });
    return (
        <ToggleBtn
            selected={!isPreventDefault}
            onClick={() => handleClick(spawnParent, spawn)}
        >
            {`${specialWord ? specialWord : ''}${wording}`}
        </ToggleBtn>
    );
}

export default ToggleButton;
