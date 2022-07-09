import React from 'react';
import { BadgeStyle, CloseIcon } from './style';

function Badge({ className, value, onClose }) {
    return (
        <BadgeStyle className={className}>
            {value}
            {onClose && <CloseIcon onClick={onClose} />}
        </BadgeStyle>
    );
}

export default Badge;
