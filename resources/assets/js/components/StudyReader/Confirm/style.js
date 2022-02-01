import styled from 'styled-components';

export const ConfirmBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ isConfirmed }) =>
        isConfirmed ? '#19AB27' : '#F5587B'};

    grid-column-start: 1;
    grid-column-end: 4;
`;
export const ConfirmText = styled.span`
    margin-left: 5px;
`;
