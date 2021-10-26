import styled from 'styled-components';
import { Button } from '@/theme/global';

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

export const SubmitButton = styled(Button)`
    font-size: 12px;
    height: 30px;
`;
