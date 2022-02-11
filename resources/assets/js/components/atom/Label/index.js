import React from 'react';
import { Title } from './style';

function Label(props) {
    return <Title {...props}>{props.value}</Title>;
}

export default Label;
