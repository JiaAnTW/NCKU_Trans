import styled from 'styled-components';
import { ScrollBarStyle } from '~/theme/global';

export const ScrollableContainer = styled.section`
    grid-column: 1 / 2;
    grid-row: 2 / 3;

    @media (max-width: 576px) {
        overflow-y: auto;
        ${ScrollBarStyle}
    }
`;
