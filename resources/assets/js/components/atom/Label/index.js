import React from 'react';
import { Title, DeleteButton } from './style';

function Label(props) {
    const { value, enableDelete, onDelete, ...titleProps } = props;

    return (
        <Title {...titleProps}>
            {value}{' '}
            {enableDelete && <DeleteButton onClick={onDelete}></DeleteButton>}
        </Title>
    );
}

export default Label;
