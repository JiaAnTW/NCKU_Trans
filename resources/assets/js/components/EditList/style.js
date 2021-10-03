import styled from 'styled-components';
import ListItemText from '@material-ui/core/ListItemText';
import { color, Button } from '@/theme/global';
import IconButton from '@material-ui/core/IconButton';

export const CollapseLayout = styled.div`
    padding: 10px 20px;
    padding-top: 0px;

    & .MuiInputLabel-shrink {
        font-size: 1.8rem;
    }
`;

export const ConfirmLayout = styled.div`
    margin-top: 10px;
`;

export const ConfirmButton = styled(Button)`
    font-size: 12px;
    float: right;
    height: 30px;
`;

export const ListItemTextDynamic = styled(ListItemText)`
    color: ${(props) => props.highlighted === 'true' && color.darkYellow};
`;

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
