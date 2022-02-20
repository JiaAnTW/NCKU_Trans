import React, { useCallback, useRef, useState } from 'react';
import {
    InputField,
    SearchIconYellow,
    Button,
    Container,
    ClearIcon,
} from './style';

function SearchBar({ className, width, onSubmit, onChange, value }) {
    const [hidden, setHidden] = useState(false);
    const inputRef = useRef('');
    const onFocus = useCallback(() => setHidden(true), []);
    const onBlur = useCallback(() => setHidden(false), []);
    const handleClick = useCallback(
        (e) => {
            e.preventDefault();
            if (hidden) {
                if (!onSubmit) return;
                if (!inputRef.current.value) return;

                onSubmit(inputRef.current.value);
            } else {
                if (!onChange) return;
                onChange({
                    target: {
                        value: '',
                    },
                });
            }
        },
        [onSubmit, onChange, hidden]
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
            <Button onClick={handleClick}>
                <SearchIconYellow
                    hidden={hidden}
                    fontSize="large"
                ></SearchIconYellow>
                <ClearIcon hidden={!hidden} fontSize="large"></ClearIcon>
            </Button>
        </Container>
    );
}

export default SearchBar;
