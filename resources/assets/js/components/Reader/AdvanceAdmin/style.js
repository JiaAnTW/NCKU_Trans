import styled from 'styled-components';
import { color, Button } from '~/theme/global';

export const AdvanceAdminLayout = styled.div`
    margin-top: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const Text = styled.p`
    font-weight: bold;
    margin: 10px;
`;

export const BtnDark = styled(Button)`
    height: 40px;
    width: 110px;
`;

export const BtnLight = styled(Button)`
    background-color: white;
    border: 2px solid ${color.yellow};
    height: 40px;
    width: 120px;
`;
