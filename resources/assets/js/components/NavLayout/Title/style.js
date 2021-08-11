import styled from 'styled-components';

export const H1 = styled.h1`
    margin: 0;
    font-size: 2.2rem;
    font-weight: 600;

    @media (max-width: 576px) {
        padding-left: 25px;
    }
`;

export const Header = styled.header`
    display: grid;
    height: 50px;
`;
