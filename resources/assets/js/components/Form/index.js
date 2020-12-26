import React from 'react';
import StepArea from './StepArea/index';
import ControlArea from './ControlArea/index';
import { FormContainer } from './style';

function Form({ children }) {
    return (
        <FormContainer>
            <StepArea />
            <div>{children}</div>
            <ControlArea />
        </FormContainer>
    );
}

export default Form;
