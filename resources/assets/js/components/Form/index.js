import React from 'react';
import StepArea from './StepArea/index';
import ControlArea from './ControlArea/index';
import { FormContainer } from './style';

function Form({ children, onNext, onBefore }) {
    return (
        <FormContainer>
            <StepArea />
            <div>{children}</div>
            <ControlArea onNext={onNext} onBefore={onBefore} />
        </FormContainer>
    );
}

export default Form;
