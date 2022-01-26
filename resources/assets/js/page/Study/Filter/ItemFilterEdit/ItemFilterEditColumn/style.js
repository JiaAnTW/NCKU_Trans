import CreateIcon from '@material-ui/icons/Create';
import styled from 'styled-components';
import { color } from '~/theme/global';

export const EditItemIcon = styled(CreateIcon)`
    color: ${color.yellow};
    margin-right: 10px;
    cursor: pointer;
`;

export const EditItemContainer = styled.div`
    display: inline-flex;
    vertical-align: middle;
    margin-left: 17px;
    font-size: 14px;
    height: 28px;
    user-select: none;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;
