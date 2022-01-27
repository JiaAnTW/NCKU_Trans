import CreateIcon from '@material-ui/icons/Create';
import styled from 'styled-components';
import { color } from '~/theme/global';

export const FilterEditColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    min-height: 100%;
    width: 105px;
    padding: 5px;
`;

export const EditItemIcon = styled(CreateIcon)`
    color: ${color.yellow};
    margin-right: 10px;
    cursor: pointer;
    padding: 5px 0;
`;

export const EditItemContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    height: 28px;
    user-select: none;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;
