import styled from 'styled-components';
import { Button, color } from '~/theme/global';

export const ToggleBtn = styled(Button)`
    margin: 5px;
    border-radius: 30px;
    font-size: 14px;
    height: auto;
    color: ${(props) => (props.selected ? color.black : color.yellow)};
    background-color: ${(props) =>
        props.selected ? color.yellow : color.white};
    border: 1px solid ${color.yellow};
    padding: 5px 10px;
`;
