import styled from 'styled-components';

export const StatisticSection = styled.section`
    grid-column: 2 / 3;
    grid-row: 2 / 3;
`;

export const StatisticContainer = styled.div`
    display: flex;
    margin-left: 15px;
    width: 315px;
    border: rgba(0, 0, 0, 0.13) 1px solid;
`;

export const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 105px);
    align-items: center;
    justify-items: center;
`;

export const StyledTitle = styled.div`
    margin: 12px 0px 10px;
`;
