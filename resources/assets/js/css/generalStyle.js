import styled from 'styled-components';

const LoadingContainer = styled.div`
    padding-top: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

const GeneralContainer = styled.div`
    padding-top: 55px;
    display: grid;
    @media (min-width: 870px) {
        grid-template-columns: 150px auto;
    }
    @media (max-width: 869px) {
        grid-template-rows: 37px auto;
    }
    width: 100vw;
    height: 100vh;
`;

const GrayFlexContainer = styled.div`
    padding-top: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
    width: 100vw;
    height: 100vh;
`;

const MenuContainer = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, #eb6052 0%, #fe5196 100%);
`;

const MultCards = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
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

export {
    LoadingContainer,
    GeneralContainer,
    MenuContainer,
    MultCards,
    GrayFlexContainer,
};
