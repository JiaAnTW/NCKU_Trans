import styled from 'styled-components';
import { color } from '~/theme/global';

export const H1 = styled.h1`
    margin: 0;
    font-size: 2.2rem;
    font-weight: 600;
`;

export const Header = styled.header`
    display: grid;
    grid-template-columns: auto 120px;
    height: 50px;
`;

export const Container = styled.div`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: ${(props) => (props.isShowSearch ? '120px' : '50px')} auto;
    width: 100%;
    height: 100vh;
    padding: 20px 30px;
    background-color: ${color.white};
    overflow-y: auto;

    @media (max-width: 992px) {
        grid-template-rows: 50px auto;
    }

    @media (max-width: 576px) {
        padding: 10px 10px;
        padding-bottom: 0;
    }

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

export const MenuIconStyle = {
    color: color.darkBlack,
    fontSize: 30,
};
