import styled from 'styled-components';
import List from '@material-ui/core/List';
import { color } from '@/theme/global';

export const ListYellow = styled(List)`
    background-color: ${color.yellow};
    min-width: 120px;
    padding-left: 5px;

    & .MuiListItem-root.Mui-selected {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        background-color: white;
    }
`;
