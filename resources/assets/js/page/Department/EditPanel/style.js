import styled from 'styled-components';
import { color } from '@/theme/global';

export const EditPanelLayout = styled.div`
    flex-grow: 1;
    background-color: rgba(0, 0, 0, 0.02);
    padding: 10px 20px;
`;

export const ConfirmLayout = styled.div`
    min-width: 350px;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
`;

export const CollegeSpan = styled.span`
    color: ${color.darkYellow};
    margin-left: 10px;
    font-weight: bold;
`;
