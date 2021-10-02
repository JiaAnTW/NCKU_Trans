import styled from 'styled-components';
import { color } from '@/theme/global';

export const PreviewLayout = styled.div`
    position: relative;
    padding: 5px;
    background-color: ${color.white};
`;

export const PreviewTitle = styled.h4`
    text-align: center;
    font-size: 1.5rem;
`;

export const ModalStyle = {
    overlay: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
    },
};
