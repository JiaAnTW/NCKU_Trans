import React, {
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import InputBar from './InputBar';
import { SearchIconYellow, Button, Container, ClearIcon } from './style';

const SearchBar = forwardRef(
    ({ className, width, onSubmit, onChange, value, enableClear }, ref) => {
        const [hidden, setHidden] = useState(false);
        const originValue = useRef(value);
        const inputRef = useRef(undefined);

        const handleSearchClick = useCallback(
            (e) => {
                const targetRef = ref ? ref : inputRef;
                e.preventDefault();
                if (!onSubmit) return;
                if (
                    !targetRef ||
                    !targetRef.current ||
                    !targetRef.current.value
                )
                    return;
                onSubmit(targetRef.current.value);
            },
            [onSubmit, ref, inputRef]
        );
        const handleClearClick = useCallback(
            (e) => {
                const targetRef = ref ? ref : inputRef;
                const demoEvent = {
                    target: {
                        value: '',
                    },
                };

                if (e) e.preventDefault();
                if (originValue === undefined) {
                    targetRef.current.value = '';
                    demoEvent.target.value = undefined;
                }
                if (onChange) onChange(demoEvent);
            },
            [onChange, originValue, ref, inputRef]
        );

        return (
            <Container className={className} style={{ width }}>
                <InputBar
                    ref={ref ? ref : inputRef}
                    onChange={onChange}
                    setHidden={setHidden}
                    value={value}
                    handleSearchClick={handleSearchClick}
                    originValue={originValue}
                />
                <Button hidden={!hidden} onClick={handleClearClick}>
                    <ClearIcon fontSize="large" />
                </Button>
                <Button hidden={hidden} onClick={handleSearchClick}>
                    <SearchIconYellow fontSize="large" />
                </Button>
            </Container>
        );
    }
);

export default SearchBar;
