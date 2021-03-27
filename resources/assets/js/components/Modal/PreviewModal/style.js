import styled from 'styled-components';
import { color } from '@/theme/global';

export const PreviewLayout = styled.div`
    position: relative;
    padding: 5px;
    background-color: ${color.white};
    @media (max-width: 400px) {
        /*width: 350px;*/
    }
`;

export const ModalStyle = {
    overlay: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
    },
};
