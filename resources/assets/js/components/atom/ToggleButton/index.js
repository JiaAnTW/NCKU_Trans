import React from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ToggleBtn } from './style';

function ToggleButton(props) {
    const {
        index,
        clickHandle,
        specialWord,
        wording,
        parent,
        isPreventDefault,
    } = props;
    const type = useSelector((state) => state.post.type);
    const subStep = useSelector((state) => state.post.form[type].step);
    const key = useSelector((state) =>
        parent
            ? state.post.form[type][parent].value[index]
            : state.post.form[type][subStep][index]
    );
    const handleClick = useCallback(() => {
        clickHandle(index, props);
    }, [clickHandle, index]);
    return (
        <ToggleBtn selected={!isPreventDefault && key} onClick={handleClick}>
            {`${specialWord ? specialWord : ''}${wording}`}
        </ToggleBtn>
    );
}

export default ToggleButton;
