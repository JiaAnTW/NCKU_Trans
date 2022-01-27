import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import { color } from '~/theme/global';

export const Container = styled.form`
    position: relative;
    display: flex;
    align-items: center;
`;

export const InputField = styled.input`
    width: 550px;
    height: 45px;
    padding: 10px 15px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 55px;

    &:focus-visible {
        outline: 1px solid rgba(0, 0, 0, 0.5);
    }

    @media (max-width: 576px) {
        width: 183px;
        height: 35px;
    }
`;
export const Button = styled.button`
    position: absolute;
    left: 515px;
    display: inline-flex;
    cursor: pointer;
    padding: 0;
    border: 0;
    background-color: ${color.white};

    @media (max-width: 576px) {
        left: 150px;
    }
`;

export const SearchIconYellow = styled(SearchIcon)`
    color: ${color.yellow};
`;
