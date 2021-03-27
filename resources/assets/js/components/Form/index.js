import React from 'react';
import { FormContainer, Title, Subtitle } from './style';

function Form({ children, title, subtitle }) {
    return (
        <FormContainer>
            {title && <Title>{title}</Title>}
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
            <div>{children}</div>
        </FormContainer>
    );
}

export default Form;
