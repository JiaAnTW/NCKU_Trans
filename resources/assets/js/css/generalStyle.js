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
`;

export { LoadingContainer, GeneralContainer, MenuContainer, MultCards };
