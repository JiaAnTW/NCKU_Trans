import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import { color } from '~/theme/global';

export const BadgeStyle = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    height: 26px;
    border: none;

    background: ${color.backgroundYellow};
    color: ${color.darkYellow};
    font-size: 14px;
    border-radius: 30px;

    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 5px;
`;

export const CloseIcon = styled(ClearIcon)`
    margin-left: 10px;
    font-size: 14px;
    cursor: pointer;
`;
