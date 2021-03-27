import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const color = {
    yellow: 'rgba(254, 218, 106, 1)',
    darkYellow: '#e1af13',
    white: 'white',
    darkWhite: '#F8F8F8',
    lightGray: 'rgba(212, 212, 220, 1)',
    darkGray: 'rgba(163,158,158,1)',
    lightBlack: 'rgba(57, 63, 77, 1)',
    darkBlack: 'rgba(29, 30, 34, 1)',
};

export const Button = styled.button`
    outline: none;
    border: none;
    background-color: ${(props) => (props.light ? color.white : color.yellow)};
    color: ${color.darkBlack};
    border-radius: 5px;
    height: 40px;

    :hover {
        background-color: ${(props) =>
            props.light ? color.lightGray : color.darkYellow};
    }

    :focus {
        outline: none;
    }
`;

export const CardsContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${color.white};
    width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 10px;
`;

export const WhiteContainer = styled.div`
    background-color: ${color.white};
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;

export const LoadingContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

//---------以下為全局設定---------
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Noto Sans TC', 'Microsoft JhengHei';
    color: ${color.darkBlack};
    font-size: 15px;
  }

  #root{
    background-color: ${color.white};
  }

    textarea::-webkit-scrollbar {
        width: 1px;
        height: 1px;
        background-color: transparent;
        border: none;
    }

    textarea::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: ${color.yellow};
        opacity: 0.5;
    }

    textarea::-webkit-scrollbar-track {
        background-color: transparent;
        border: 0px solid;
    }
`;

export default GlobalStyle;

import { createMuiTheme } from '@material-ui/core/styles';

export const materialTheme = createMuiTheme({
    palette: {
        primary: {
            main: color.yellow,
        },
    },
});
