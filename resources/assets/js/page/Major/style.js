import styled from 'styled-components';

export const Main = styled.main`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 50px 160px auto;
    overflow-y: auto;

    @media (max-width: 576px) {
        grid-template-rows: 100px 160px auto;
    }

    @media (max-width: 576px) {
        margin: 0px -10px;
    }

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
