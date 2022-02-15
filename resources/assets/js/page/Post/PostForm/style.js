import styled from 'styled-components';
import { color } from '~/theme/global';

export const FormLayout = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export const InputBackground = styled.div`
    width: 100%;
    height: 100%;
`;

export const StepLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

export const Title = styled.p`
    display: flex;
    justify-content: center;
    color: ${color.darkGray};
`;
