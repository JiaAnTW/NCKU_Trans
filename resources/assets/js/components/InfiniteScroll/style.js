import { FixedSizeList } from 'react-window';
import styled from 'styled-components';
import { ScrollBarStyle } from '~/theme/global';

export const ListContainer = styled(FixedSizeList)`
    height: fit-content !important;
    max-height: 100%;

    @media (max-width: 576px) {
        display: block;
        margin: 0px 10px;
    }

    @media (min-width: 576px) {
        overflow-y: auto;
        ${ScrollBarStyle}
    }
`;
