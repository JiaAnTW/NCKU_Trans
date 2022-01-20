import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import { color } from '~/theme/global';

export const BadgeStyle = styled.span`
    display: flex;
    align-items: center;
    padding: 3px 12px;
    height: 27px;

    background: ${color.backgroundYellow};
    color: ${color.darkYellow};
    font-size: 14px;
    user-select: none;

    border-radius: 30px;
    margin: 5px;
`;

export const CloseIcon = styled(ClearIcon)`
    margin-left: 8px;
    font-size: 14px;
    cursor: pointer;
`;
