import React from 'react';
import { useSelector } from 'react-redux';

import { ControlAreaContainer, ControlButton } from './style';

function ControlArea({ onNext, onBefore, nextText, beforeText, enableCancel }) {
    const step = useSelector((state) => state.post.step);

    return (
        <ControlAreaContainer>
            {(step >= 2 || enableCancel) && (
                <ControlButton
                    light
                    style={{ marginRight: '20px' }}
                    onClick={onBefore}
                >
                    {beforeText ? beforeText : '返回'}
                </ControlButton>
            )}
            <ControlButton onClick={onNext}>
                {nextText ? nextText : '下一步'}
            </ControlButton>
        </ControlAreaContainer>
    );
}

export default ControlArea;
