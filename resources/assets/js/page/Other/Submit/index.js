import React from 'react';
import { SubmitButton } from './style';

function Submit(props) {
    const { onClick } = props;
    return <SubmitButton onClick={onClick}>送出</SubmitButton>;
}

export default Submit;
