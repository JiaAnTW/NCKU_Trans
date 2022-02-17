import styled, { css } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const color = {
    yellow: 'rgba(254, 218, 106, 1)', // #FEDA6A
    backgroundYellow: 'rgba(254, 218, 106, 0.4)',
    lightYellow: 'rgba(255, 238, 173, 1)',
    darkYellow: 'rgba(225, 175, 19, 1)', // #E1AF13
    white: '#FFFFFF',
    darkWhite: '#F8F8F8',
    lightGray: 'rgba(212, 212, 220, 1)',
    darkGray: 'rgba(163,158,158,1)',
    lightBlack: 'rgba(57, 63, 77, 1)',
    darkBlack: 'rgba(29, 30, 34, 1)',
    red: 'rgba(245,88,123,1)',
};

export const colorMap = {
    轉系: {
        color: color.darkYellow,
        backgroundColor: color.backgroundYellow,
    },
    輔系: {
        color: color.black,
        backgroundColor: 'rgba(29, 30, 34, 0.2)',
    },
    雙主修: {
        color: color.white,
        backgroundColor: '#393F4D',
    },
};

export const ScrollBarStyle = css`
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

export const Button = styled.button`
    outline: none;
    border: none;
    background-color: ${(props) =>
        props.theme && props[props.theme]
            ? props[props.theme].backgroundColor.default
            : props['dark'].backgroundColor.default};
    color: ${color.darkBlack};
    border-radius: 5px;
    height: 40px;

    :hover {
        cursor: pointer;
        background-color: ${(props) =>
            props.theme && props[props.theme]
                ? props[props.theme].backgroundColor.hover
                : props['dark'].backgroundColor.hover};
    }

    :focus {
        outline: none;
    }
`;

Button.defaultProps = {
    dark: {
        backgroundColor: {
            default: color.yellow,
            hover: color.darkYellow,
        },
    },
    light: {
        backgroundColor: {
            default: color.white,
            hover: color.lightGray,
        },
    },
    alert: {
        backgroundColor: {
            default: color.red,
            hover: color.lightGray,
        },
    },
};

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
    overflow-x: hidden;

    @media (max-width: 576px) {
        display: block;
    }

    @media (min-width: 576px) {
        overflow-y: auto;
        ${ScrollBarStyle}
    }
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
    html{
        font-size: 10px;
    }

  body {
    margin: 0;
    font-family: 'Noto Sans TC', 'Microsoft JhengHei';
    color: ${color.darkBlack};
    font-size: 15px;
    line-height: 1.42857143;
    overflow-y: hidden;
  }

  #root{
    background-color: ${color.white};
  }
  
  .Overlay{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.4);
    width: 100%;
    height: 100%;
  }

    textarea::-webkit-scrollbar, section::-webkit-scrollbar {
        width: 1px;
        height: 1px;
        background-color: transparent;
        border: none;
    }

    textarea::-webkit-scrollbar-thumb, section::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: ${color.yellow};
        opacity: 0.5;
    }

    textarea::-webkit-scrollbar-track, section::-webkit-scrollbar-track {
        background-color: transparent;
        border: 0px solid;
    }

    .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
        margin-bottom: 0.5rem;
        font-family: inherit;
        font-weight: 500;
        line-height: 1.2;
        color: inherit;
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
