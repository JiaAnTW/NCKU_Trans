import React from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ToggleBtn } from './style';

function ToggleButton(props) {
    const {
        index,
        handleClick,
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
    const OnClickHandle = useCallback(() => {
        handleClick(index, props);
    }, [handleClick, index]);
    return (
        <ToggleBtn selected={!isPreventDefault && key} onClick={OnClickHandle}>
            {`${specialWord ? specialWord : ''}${wording}`}
        </ToggleBtn>
    );
}

export default ToggleButton;
