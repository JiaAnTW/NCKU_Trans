import React, { useCallback, useRef, useState } from 'react';
import { InputField, SearchIconYellow, Button, Container } from './style';

function SearchBar({ className, width, onSubmit, onChange, value }) {
    const [hidden, setHidden] = useState(false);
    const inputRef = useRef('');
    const onFocus = useCallback(() => setHidden(true), []);
    const onBlur = useCallback(() => setHidden(false), []);
    const handleClick = useCallback(
        (e) => {
            e.preventDefault();
            if (!inputRef.current.value) return;

            onSubmit(inputRef.current.value);
        },
        [onSubmit]
    );

    return (
        <Container className={className} style={{ width }}>
            <InputField
                onChange={onChange}
                ref={inputRef}
                onFocus={onFocus}
                onBlur={onBlur}
                value={value}
            />
            <Button hidden={hidden} onClick={handleClick}>
                <SearchIconYellow fontSize="large"></SearchIconYellow>
            </Button>
        </Container>
    );
}

export default SearchBar;
