import styled from 'styled-components';
import { color } from '~/theme/global';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

export const ArrowIcon = styled(NavigateBeforeIcon)`
    transform: ${({ direction }) =>
        direction === 'left' ? 'none' : 'rotate(180deg)'};
`;
export const Button = styled.button`
    border: 0;
    cursor: pointer;
    background-color: ${color.white};
    height: 100%;
`;
