import styled from 'styled-components';
import { Button, color } from '~/theme/global';
export const SelectorButton = styled(Button)`
    margin: 10px;
    border-radius: 30px;
    background-color: ${color.white};
    border: 1px solid ${color.yellow};
    min-width: 80px;
    padding: 10px;
`;
