import React from 'react';

import { ControlAreaContainer, ControlButton } from './style';

function ControlArea({ onNext, onBefore, nextText, beforeText }) {
    return (
        <ControlAreaContainer>
            <ControlButton
                light
                style={{ marginRight: '20px' }}
                onClick={onBefore}
            >
                {beforeText ? beforeText : '返回'}
            </ControlButton>
            <ControlButton onClick={onNext}>
                {nextText ? nextText : '下一步'}
            </ControlButton>
        </ControlAreaContainer>
    );
}

export default ControlArea;
