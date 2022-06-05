import styled from 'styled-components';
import { color } from '~/theme/global';

export const ReaderLayout = styled.div`
    position: relative;
    width: 600px;
    height: ${(props) => (props.isAdmin ? '80vh' : '700px')};
    padding: 5px;
    background-color: ${color.white};
    color: ${color.black};
    display: grid;
    grid-template-columns: 50px auto 50px;
    grid-template-rows: 100%;
    @media (max-width: 992px) {
        width: 360px;
        height: 500px;
        height: 75vh;
        min-width: 95vw;
    }
`;

export const ReaderContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 5px;
`;

export const ReaderText = styled.div`
    line-height: 2.8rem;
    letter-spacing: 2.5px;
    overflow-y: auto;
    line-break: anywhere;
    text-align: justify;
    white-space: pre-line;
    font-size: 17px;

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
