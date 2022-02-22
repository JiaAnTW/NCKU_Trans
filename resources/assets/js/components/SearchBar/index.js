import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    InputField,
    SearchIconYellow,
    Button,
    Container,
    ClearIcon,
} from './style';

var originValue = '';
function spawnInput(inputRef, onChange, onFocus, onBlur, value) {
    let temp;
    if (onChange && originValue !== undefined)
        temp = (
            <InputField
                onChange={onChange}
                value={value}
                ref={inputRef}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        );
    else if (onChange)
        temp = (
            <InputField
                onChange={onChange}
                ref={inputRef}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        );
    else temp = <InputField ref={inputRef} onFocus={onFocus} onBlur={onBlur} />;
    return temp;
}
function SearchBar({ className, width, onSubmit, onChange, value }) {
    const [hidden, setHidden] = useState(false);
    const inputRef = useRef('');
    useEffect(() => {
        originValue = value;
        return originValue === undefined ? handleFocusClick() : () => {};
    }, []);
    const onFocus = useCallback(
        () => setTimeout(() => setHidden(true), 200),
        [setHidden]
    );
    const onBlur = useCallback(
        () => setTimeout(() => setHidden(false), 200),
        [setHidden]
    );
    const handleClick = useCallback(
        (e) => {
            e.preventDefault();
            if (!onSubmit) return;
            if (!inputRef.current.value) return;

            onSubmit(inputRef.current.value);
        },
        [onSubmit]
    );
    const handleFocusClick = useCallback(
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
            {spawnInput(inputRef, onChange, onFocus, onBlur, value)}
            <Button hidden={!hidden} onClick={handleFocusClick}>
                <ClearIcon fontSize="large" />
            </Button>
            <Button hidden={hidden} onClick={handleClick}>
                <SearchIconYellow fontSize="large" />
            </Button>
        </Container>
    );
}

export default SearchBar;
