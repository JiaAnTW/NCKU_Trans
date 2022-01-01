import styled from 'styled-components';

export const H1 = styled.h1`
    position: static;
    font-size: 20px;
    margin: 0;
    color: #000000;

    @media (max-width: 576px) {
        padding-left: 25px;
    }
`;

export const Header = styled.header`
    position: static;
    display: inline-flex;
    vertical-align: sub;
    flex-direction: row;
    align-items: center;
    height: 57px;
`;
