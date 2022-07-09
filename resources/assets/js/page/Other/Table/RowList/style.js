import styled from 'styled-components';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import VisibilityIcon from '@material-ui/icons/Visibility';

export const ResetButton = styled(RotateLeftIcon)`
    cursor: pointer;
    font-size: 25px;
`;

export const PreviewButton = styled(VisibilityIcon)`
    font-size: 25px;
`;

export const Input = styled.input`
    width: 100%;
    font-size: 23px;
    border: 0;
    border-bottom: 1px solid black;
    outline: none;
    background-color: transparent;
`;
