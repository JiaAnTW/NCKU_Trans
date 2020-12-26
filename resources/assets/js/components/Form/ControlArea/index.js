import React from 'react';
import Button from '../../atom/Button/index';
import { ControlAreaContainer } from './style';

function ControlArea() {
    return (
        <ControlAreaContainer>
            <Button theme="light" style={{ marginRight: '20px' }}>
                返回
            </Button>
            <Button>下一步</Button>
        </ControlAreaContainer>
    );
}

export default ControlArea;
