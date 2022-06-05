import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: auto;
    overflow-y: hidden;
    grid-template-rows: 50px auto;

    @media (max-width: 576px) {
        grid-template-columns: 600px auto;
        margin: 0px -10px;
    }
`;
