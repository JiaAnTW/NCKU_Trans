import React from 'react';
import { BadgeStyle, CloseIcon } from './style';

function Badge(props) {
    return (
        <BadgeStyle>
            {props.value}
            <CloseIcon onClick={props.onClose} />
        </BadgeStyle>
    );
}

export default Badge;
