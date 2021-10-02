import styled from 'styled-components';
import { color, Button } from '@/theme/global';

export const AddCollegeLayout = styled.div`
    background-color: white;
    padding: 20px 10px;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    flex-grow: 1;
`;

export const SubmitLayout = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
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

export const SubmitButton = styled(Button)`
    font-size: 12px;
    height: 30px;
`;
