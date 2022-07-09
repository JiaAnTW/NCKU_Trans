import React from 'react';
import { CheckedBox, NCheckedBox } from './style';

function CheckBox(props) {
    const { isCheck, onClick } = props;
    return (
        <>
            {isCheck ? (
                <CheckedBox onClick={onClick} />
            ) : (
                <NCheckedBox onClick={onClick} />
            )}
        </>
    );
}

export default CheckBox;
