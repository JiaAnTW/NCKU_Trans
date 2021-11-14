import styled from 'styled-components';
import { Button } from '~/theme/global';

export const ControlAreaContainer = styled.div`
    height: 75px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px;
`;

export const ControlButton = styled(Button)`
    min-width: 100px;
`;
