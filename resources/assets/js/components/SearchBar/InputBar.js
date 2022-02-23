import React, { forwardRef, useCallback, useMemo } from 'react';
import { InputField } from './style';

const InputBar = forwardRef(
    ({ onChange, setHidden, value, handleSearchClick, originValue }, ref) => {
        const onFocus = useCallback(
            () => setTimeout(() => setHidden(true), 200),
            []
        );
        const onBlur = useCallback(
            () => setTimeout(() => setHidden(false), 200),
            []
        );
        const handlePressEnter = useCallback(
            (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearchClick(e);
                }
            },
            [handleSearchClick]
        );
        const temp = useMemo(() => {
            if (onChange && originValue !== undefined)
                return {
                    onChange: onChange,
                    value: value,
                };
            else if (onChange)
                return { onChange: onChange, value: ref.current.value };
            else return {};
        }, [value]);

        return (
            <InputField
                onKeyPress={handlePressEnter}
                ref={ref}
                onFocus={onFocus}
                onBlur={onBlur}
                {...temp}
            />
        );
    }
);
export default InputBar;
