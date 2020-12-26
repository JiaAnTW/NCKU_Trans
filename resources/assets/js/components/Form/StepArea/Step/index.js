import React from 'react';
import { StepContainer, NumberBox, Description } from './style';

function Step({ number, description, active }) {
    return (
        <StepContainer>
            <NumberBox active={active}>{number}</NumberBox>
            <Description active={active}>{description}</Description>
        </StepContainer>
    );
}

export default Step;
