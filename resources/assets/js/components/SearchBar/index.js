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
    ({ className, width, onSubmit, onChange, value }, ref) => {
        const [hidden, setHidden] = useState(false);
        const [originValue, setOriginValue] = useState('');

        useEffect(() => {
            setOriginValue(value);
        }, []);
        const handleSearchClick = useCallback(
            (e) => {
                e.preventDefault();
                if (!onSubmit) return;
                if (!ref.current.value) return;
                onSubmit(ref.current.value);
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
                    ref.current.value = '';
                    demoEvent.target.value = undefined;
                }
                if (onChange) onChange(demoEvent);
            },
            [onChange, originValue]
        );

        return (
            <Container className={className} style={{ width }}>
                <InputBar
                    ref={ref}
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
