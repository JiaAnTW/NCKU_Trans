import styled from 'styled-components';
import SearchBar from '~/components/SearchBar';

export const H1 = styled.h1`
    margin: 0;
    font-size: 1.7rem;
    font-weight: 500;
    width: 100%;

    @media (max-width: 992px) {
        padding-left: 25px;
        width: auto;
        align-items: center;
    }
`;

export const H2 = styled.h2`
    margin: 0;
    font-size: 2.2rem;
    font-weight: 600;
    width: 100%;

    @media (max-width: 992px) {
        padding-left: 25px;
        width: auto;
        align-items: center;
    }
`;

export const Search = styled(SearchBar)`
    width: 550px;
    height: 45px;
    display: ${(props) => (props.isShow ? 'flex' : 'none')};
    @media (max-width: 992px) {
        flex-grow: 1;
        width: 50%;
        height: 35px;
        padding-left: 25px;
    }

    @media (max-width: 576px) {
        width: 30%;
        height: 35px;
        padding-left: 25px;
    }
`;

export const Header = styled.header`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;
