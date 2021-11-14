import styled from 'styled-components';
import { color } from '~/theme/global';
import IconButton from '@material-ui/core/IconButton';

export const DeleteButton = styled(IconButton)`
    background-color: ${color.red};
    color: ${color.white};
    outline: none;
    border-radius: 3px;
    margin-right: 20px;
    height: 30px;
    padding: 10px;

    :hover {
        background-color: ${color.red};
        color: ${color.white};
        outline: none;
    }

    & .MuiSvgIcon-root {
        font-size: 18px;
    }
`;

export const ConfirmLayout = styled.div`
    min-width: 350px;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
`;

export const TargetSpan = styled.span`
    color: ${color.darkYellow};
    margin: 0 10px;
    font-weight: bold;
`;
