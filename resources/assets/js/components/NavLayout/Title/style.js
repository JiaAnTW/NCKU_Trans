import styled from 'styled-components';

export const H1 = styled.h1`
    margin-bottom: 2px;
    font-size: 1.7rem;
    font-weight: 500;

    @media (max-width: 576px) {
        padding-left: 25px;
    }
`;

export const Header = styled.header`
    display: inline-flex;
    vertical-align: middle;
`;
