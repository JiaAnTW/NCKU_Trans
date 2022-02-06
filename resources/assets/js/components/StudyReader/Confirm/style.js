import Toggle from 'react-toggle';
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
export const StyledToggle = styled(Toggle)`
    &.react-toggle--checked .react-toggle-track {
        background-color: #4d4d4d;
    }
    &.react-toggle--checked:hover:not(.react-toggle--disabled)
        .react-toggle-track {
        background-color: #000000;
    }
`;
export const ConfirmText = styled.span`
    margin-left: 5px;
    color: #ffffff;
`;
