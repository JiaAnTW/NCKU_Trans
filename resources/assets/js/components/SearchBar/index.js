import React, { useCallback, useRef, useState } from 'react';
import { InputField, SearchIconYellow, Button, Container } from './style';

function SearchBar({ className, width, onSubmit }) {
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
            <InputField ref={inputRef} onFocus={onFocus} onBlur={onBlur} />
            <Button hidden={hidden} onClick={handleClick}>
                <SearchIconYellow fontSize="large"></SearchIconYellow>
            </Button>
        </Container>
    );
}

export default SearchBar;
