import React, { useCallback, useMemo } from 'react';
import { InputField } from './style';

function InputBar({
    inputRef,
    onChange,
    setHidden,
    value,
    handleSearchClick,
    originValue,
}) {
    const onFocus = useCallback(
        () => setTimeout(() => setHidden(true), 200),
        []
    );
    const onBlur = useCallback(
        () => setTimeout(() => setHidden(false), 200),
        []
    );
    const handlePressEnter = useCallback((e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchClick(e);
        }
    });
    const temp = useMemo(() => {
        if (onChange && originValue !== undefined)
            return {
                onChange: onChange,
                value: value,
            };
        else if (onChange)
            return { onChange: onChange, value: inputRef.current.value };
        else return {};
    }, [value]);
    return (
        <InputField
            onKeyPress={handlePressEnter}
            ref={inputRef}
            onFocus={onFocus}
            onBlur={onBlur}
            {...temp}
        />
    );
}

export default InputBar;
