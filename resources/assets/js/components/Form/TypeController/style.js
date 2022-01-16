import styled from 'styled-components';
import { color, Button } from '~/theme/global';
export const TypeButtonList = styled.div`
    display: flex;
    margin: auto;
`;
export const BoxList = styled.div`
    display: flex;
    margin: auto;
`;
export const SmallYellowBox = styled.div`
    width: 32px;
    height: 6px;
    background-color: ${color.yellow};
    opacity: ${(props) => (props.selected ? 1 : 0.5)};
    margin: 10px;
`;
export const Text = styled.div`
    position: relative;
    top: -2px;
`;

export const SwitchButton = styled(Button)`
    background-color: ${(props) =>
        props.selected ? color.white : color.yellow};
    color: ${(props) => (props.selected ? color.yellow : color.black)};
    padding: 10px;
    border-radius: 50px;
    border: 3px solid ${color.yellow};
    margin: 10px;
`;
