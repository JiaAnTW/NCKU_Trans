import React from 'react';
import { StepAreaContainer } from './style';
import Step from './Step/index';
const stepArr = [
    { number: 1, description: '寫個基本資料' },
    { number: 2, description: '填寫心得本文' },
    { number: 3, description: '等待送出成功' },
];

function StepArea() {
    return (
        <StepAreaContainer>
            {stepArr.map((step) => (
                <Step {...step} key={step.number} active />
            ))}
        </StepAreaContainer>
    );
}

export default StepArea;
