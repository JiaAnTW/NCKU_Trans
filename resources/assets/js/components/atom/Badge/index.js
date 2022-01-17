import React from 'react';
import { BadgeStyle, CloseIcon } from './style';

function Badge(props) {
    return (
        <BadgeStyle>
            {props.value}
            {props.onClose !== undefined && (
                <CloseIcon onClick={props.onClose} />
            )}
        </BadgeStyle>
    );
}

export default Badge;
