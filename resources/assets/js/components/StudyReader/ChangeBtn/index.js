import React from 'react';
import { ArrowIcon, Button } from './style';

function ChangeBtn({ direction, onClick }) {
    return (
        <Button onClick={onClick}>
            <ArrowIcon direction={direction} fontSize="large"></ArrowIcon>
        </Button>
    );
}

export default ChangeBtn;
