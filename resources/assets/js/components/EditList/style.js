import styled from 'styled-components';
import ListItemText from '@material-ui/core/ListItemText';
import { color, Button } from '@/theme/global';

export const CollapseLayout = styled.div`
    padding: 10px 20px;
    padding-top: 0px;

    & .MuiInputLabel-shrink {
        font-size: 1.8rem;
    }
`;

export const ConfirmLayout = styled.div`
    float: right;
    margin-top: 10px;
`;

export const ConfirmButton = styled(Button)`
    font-size: 12px;
    height: 30px;
`;

export const ListItemTextDynamic = styled(ListItemText)`
    color: ${(props) => props.highlighted === 'true' && color.darkYellow};
`;
