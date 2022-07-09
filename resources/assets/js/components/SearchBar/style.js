import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import styled from 'styled-components';
import { color } from '~/theme/global';

export const Container = styled.form`
    position: relative;
    display: flex;
    align-items: center;
`;

export const InputField = styled.input`
    width: 100%;
    height: 45px;
    padding: 10px 15px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 55px;

    &:focus-visible {
        outline: 1px solid rgba(0, 0, 0, 0.5);
    }

    @media (max-width: 576px) {
        height: 35px;
    }
`;
export const Button = styled.button`
    display: 'inline-flex';
    position: absolute;
    right: 12px;
    cursor: pointer;
    padding: 0;
    border: 0;
    background-color: ${color.white};
`;

export const SearchIconYellow = styled(SearchIcon)`
    display: ${({ hidden }) => (hidden ? 'none' : 'inline-flex')};
    color: ${color.yellow};
`;

export const ClearIcon = styled(CancelIcon)`
    display: ${({ hidden }) => (hidden ? 'none' : 'inline-flex')};
    color: ${color.red};
`;
