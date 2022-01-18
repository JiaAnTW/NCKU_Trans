import styled, { keyframes } from 'styled-components';
import { color } from '~/theme/global';
export const MajorSelector = styled.div``;

export const InputArrLayout = styled.div`
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

const slideLeft = keyframes`
    0% {transform: translateX(1500px)}
    50% {
        transform: translateX(0);    }
`;
const slideRight = keyframes`
    0% {transform: translateX(-1500px)}
    50% {
        transform: translateX(0);
    }
`;
export const SubForm = styled.div`
    animation: ${(props) =>
            props.animateType === -1
                ? props.isCurrent
                    ? slideRight
                    : slideRight
                : props.animateType === 1
                ? props.isCurrent
                    ? slideLeft
                    : slideLeft
                : ''}
        1s;
    display: ${(props) => (props.isCurrent ? 'block' : 'none')};
`;
export const SelectorLayout = styled.div`
    width: 500px;
    margin: auto;
`;
