import React from 'react';
import Button from '../../atom/Button/index';
import { ControlAreaContainer } from './style';

function ControlArea({ onNext, onBefore }) {
    return (
        <ControlAreaContainer>
            <Button
                theme="light"
                style={{ marginRight: '20px' }}
                onClick={onBefore}
            >
                返回
            </Button>
            <Button onClick={onNext}>下一步</Button>
        </ControlAreaContainer>
    );
}

export default ControlArea;
