import styled from 'styled-components';
import { color, Button } from '~/theme/global';

export const TypeButtonList = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 59px;
`;
export const BoxList = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 29px;
`;
export const SmallYellowBox = styled.div`
    width: 32px;
    height: 6px;
    background-color: ${color.yellow};
    opacity: ${(props) => (props.selected ? 1 : 0.5)};
    margin: 0 5px 0 5px;
`;
export const Text = styled.div``;

export const SwitchButton = styled(Button)`
    display: flex;
    width: 128px;
    height: 56px;
    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
        props.selected ? color.yellow : color.white};
    color: ${(props) => (props.selected ? color.black : color.yellow)};
    padding: 10px;
    border-radius: 50px;
    border: 3px solid ${color.yellow};
    margin: 0 25px;
    @media (max-width: 368px) {
        width: auto;
        height: auto;
        padding: 10px;
        margin: 0 10px;
    }
`;
