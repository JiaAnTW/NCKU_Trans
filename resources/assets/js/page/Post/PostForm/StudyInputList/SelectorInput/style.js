import styled from 'styled-components';
import { Button, color } from '~/theme/global';
export const SelectorButton = styled(Button)`
    margin: 5px;
    border-radius: 30px;
    color: ${(props) => (props.selected ? color.black : color.yellow)};
    background-color: ${(props) =>
        props.selected ? color.yellow : color.white};
    border: 1px solid ${color.yellow};
    min-width: 70px;
    padding: 10px;
`;
