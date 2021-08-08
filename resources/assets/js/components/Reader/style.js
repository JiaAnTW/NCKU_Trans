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
    grid-template-rows: 100%;
    @media (max-width: 576px) {
        width: 350px;
    }
`;

export const ReaderContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 5px;
`;

export const ReaderText = styled.div`
    line-height: 2.4rem;
    letter-spacing: 1.5px;
    overflow-y: auto;
    line-break: anywhere;
    text-align: justify;
    white-space: pre-line;

    ::-webkit-scrollbar {
        width: 1px;
        height: 1px;
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
