import styled from 'styled-components';

export const H1 = styled.h1`
    margin: 0;
    font-size: 1.7rem;
    font-weight: 500;

    @media (max-width: 576px) {
        padding-left: 25px;
    }
`;

export const H2 = styled.h2`
    margin: 0;
    font-size: 2.2rem;
    font-weight: 600;

    @media (max-width: 576px) {
        padding-left: 25px;
    }
`;

export const Header = styled.header`
    display: flex;
`;
