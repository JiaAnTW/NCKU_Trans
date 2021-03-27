import styled from 'styled-components';
import { color } from '@/theme/global';

export const InputArrLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    padding: 25px;
    /*display: flex;
    flex-wrap: wrap;*/
    grid-gap: 10px;
    background-color: ${color.white};
`;

export const InputStepLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 25px;
`;
