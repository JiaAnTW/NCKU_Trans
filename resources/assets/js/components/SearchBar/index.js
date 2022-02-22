import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    InputField,
    SearchIconYellow,
    Button,
    Container,
    ClearIcon,
} from './style';

var originValue = '';
function spawnInput(
    inputRef,
    onChange,
    onFocus,
    onBlur,
    value,
    handleSearchClick
) {
    const handlePressEnter = useCallback((e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchClick(e);
        }
    });
    let temp;
    if (onChange && originValue !== undefined)
        temp = {
            onChange: onChange,
            value: value,
        };
    else if (onChange) temp = { onChange: onChange };
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
function SearchBar({ className, width, onSubmit, onChange, value }) {
    const [hidden, setHidden] = useState(false);
    const inputRef = useRef('');
    useEffect(() => {
        originValue = value;
        return originValue === undefined ? handleClearClick() : () => {};
    }, []);
    const onFocus = useCallback(
        () => setTimeout(() => setHidden(true), 200),
        [setHidden]
    );
    const onBlur = useCallback(
        () => setTimeout(() => setHidden(false), 200),
        [setHidden]
    );
    const handleSearchClick = useCallback(
        (e) => {
            e.preventDefault();
            if (!onSubmit) return;
            if (!inputRef.current.value) return;
            onSubmit(inputRef.current.value);
        },
        [onSubmit]
    );
    const handleClearClick = useCallback(
        (e) => {
            const demoEvent = {
                target: {
                    value: '',
                },
            };

            if (e) e.preventDefault();
            if (originValue === undefined) {
                inputRef.current.value = '';
                demoEvent.target.value = undefined;
            }
            if (onChange) onChange(demoEvent);
        },
        [onChange]
    );
    return (
        <Container className={className} style={{ width }}>
            {spawnInput(
                inputRef,
                onChange,
                onFocus,
                onBlur,
                value,
                handleSearchClick
            )}
            <Button hidden={!hidden} onClick={handleClearClick}>
                <ClearIcon fontSize="large" />
            </Button>
            <Button hidden={hidden} onClick={handleSearchClick}>
                <SearchIconYellow fontSize="large" />
            </Button>
        </Container>
    );
}

export default SearchBar;
