import React from 'react';
import { BadgeStyle, CloseIcon } from './style';

function Badge({ value, onClose }) {
    return (
        <BadgeStyle>
            {value}
            {onClose !== undefined && <CloseIcon onClick={onClose} />}
        </BadgeStyle>
    );
}

export default Badge;
