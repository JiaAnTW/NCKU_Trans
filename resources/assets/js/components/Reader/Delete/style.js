import styled from 'styled-components';
import { color, Button } from '@/theme/global';

export const DeleteLayout = styled.div`
    margin-top: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const DeleteText = styled.p`
    font-weight: bold;
    margin: 10px;
`;

export const DeleteBtnDark = styled(Button)`
    height: 50px;
    width: 110px;
`;

export const DeleteBtnLight = styled(Button)`
    background-color: white;
    border: 2px solid ${color.yellow};
    height: 50px;
    width: 120px;
`;
