import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: auto;
    overflow-y: hidden;

    @media (min-width: 576px) {
        grid-template-rows: 50px 100px auto;
    }

    @media (max-width: 576px) {
        grid-template-rows: 100px auto;
        margin: 0px -10px;
    }
`;
