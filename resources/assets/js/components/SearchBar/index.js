import React, { useRef } from 'react';
import { InputField, SearchIconYellow, Button, Container } from './style';

function SearchBar({ className, onSubmit }) {
    const inputRef = useRef('');
    const handleClick = (e) => {
        e.preventDefault();
        if (!inputRef.current.value) return;

        onSubmit(inputRef.current.value);
    };

    return (
        <Container className={className}>
            <InputField ref={inputRef} />
            <Button onClick={handleClick}>
                <SearchIconYellow fontSize="large"></SearchIconYellow>
            </Button>
        </Container>
    );
}

export default SearchBar;
