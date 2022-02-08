import React, { useCallback } from 'react';
import Input from '../Input';
import Label from '../Label';
import { PairInputLayout } from './style';

const labelStyle = {
    size: '17px',
    align: 'left',
};
function packDataToElement(title, value) {
    return { target: { value: { title: title, value: value } } };
}

function PairInput(props) {
    const { wording, subWording, onChange } = props;
    const { title, value } = props.value;
    const handleTitleChange = useCallback(
        (e) => {
            onChange(packDataToElement(e.target.value, value));
        },
        [onChange, value]
    );
    const handleValueChange = useCallback(
        (e) => {
            onChange(packDataToElement(title, e.target.value));
        },
        [onChange, title]
    );
    return (
        <>
            <Label {...labelStyle} value={wording} />
            <PairInputLayout>
                <Input
                    value={title}
                    wording={subWording[0]}
                    onChange={handleTitleChange}
                />
                <Input
                    value={value}
                    wording={subWording[1]}
                    onChange={handleValueChange}
                />
            </PairInputLayout>
        </>
    );
}

export default PairInput;
