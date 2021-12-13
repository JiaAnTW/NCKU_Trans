import styled from 'styled-components';

export const Main = styled.main`
    display: grid;
    grid-template-columns: auto;
    overflow-y: hidden;

    @media (min-width: 576px) {
        grid-template-rows: 100px 160px auto;
    }

    @media (max-width: 576px) {
        grid-template-rows: 100px auto;
        margin: 0px -10px;
    }
`;

export const ScrollableContainer = styled.section`
    @media (min-width: 576px) {
        display: contents;
    }

    @media (max-width: 576px) {
        overflow-y: auto;

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
    }
`;
