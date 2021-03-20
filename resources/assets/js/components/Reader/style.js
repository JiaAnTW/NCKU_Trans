import styled from 'styled-components';
import { color } from '@/theme/global';

export const ReaderLayout = styled.div`
    position: relative;
    width: 450px;
    height: 500px;
    padding: 5px;
    background-color: ${color.white};
    color: ${color.black};
    display: grid;
    grid-template-columns: 50px auto 50px;

    @media (max-width: 400px) {
        width: 350px;
    }
`;

export const ReaderContent = styled.div`
    width: 100%;
    overflow-y: auto;
    display: grid;
    grid-template-rows: 60px 70px auto;
    @media (max-width: 400px) {
        grid-template-rows: 60px 140px auto;
    }
    padding: 20px 5px;
    grid-gap: 10px;
`;

export const ReaderText = styled.div`
    line-height: 2.4rem;
    letter-spacing: 1.5px;

    ::-webkit-scrollbar {
        width: 1px;
        background-color: transparent;
        border: none;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #555;
        opacity: 0.5;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
        border: 0px solid;
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
