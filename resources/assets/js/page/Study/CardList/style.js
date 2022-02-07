import styled from 'styled-components';
import { ScrollBarStyle } from '~/theme/global';

export const ScrollableContainer = styled.section`
    @media (min-width: 576px) {
        display: contents;
    }

    @media (max-width: 576px) {
        overflow-y: auto;
        ${ScrollBarStyle}
    }
`;
