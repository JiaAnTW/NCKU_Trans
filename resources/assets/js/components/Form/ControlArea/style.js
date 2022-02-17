import styled from 'styled-components';
import { Button } from '~/theme/global';

export const ControlAreaContainer = styled.div`
    width: 100%;
    height: 75px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const ControlButton = styled(Button)`
    min-width: 100px;
`;
