import styled from 'styled-components';

export const StatisticContainer = styled.section`
    display: grid;
    grid-template-columns: 400px auto;
    column-gap: 20px;
    padding: 10px 0px;

    @media (max-width: 576px) {
        height: 160px;
        grid-template-columns: 1fr 0;
        column-gap: 0px;
    }
`;
