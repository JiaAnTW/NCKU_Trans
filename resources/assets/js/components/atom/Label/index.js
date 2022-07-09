import React from 'react';
import { Title, DeleteButton } from './style';

function Label(props) {
    const { value, enableDelete, onDelete } = props;
    return (
        <Title {...props}>
            {props.value}{' '}
            {enableDelete && (
                <DeleteButton onClick={onDelete}>X 刪除</DeleteButton>
            )}
        </Title>
    );
}

export default Label;
