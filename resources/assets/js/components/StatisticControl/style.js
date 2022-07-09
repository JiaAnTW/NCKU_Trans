import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

import { color } from '~/theme/global';

const Button = styled(IconButton)`
    position: fixed;
    bottom: 40px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: ${color.white} !important;
    border-radius: 50px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    color: ${color.yellow};

    & svg {
        width: 3rem;
        height: 3rem;
    }
`;

export const ModalStyle = {
    overlay: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
    },
    content: {
        outline: 'none',
    },
};

export const Container = styled.div`
    background-color: ${color.white};
    border-radius: 5px;
    padding-left: 2px;
    padding-right: 2px;
`;

export const ModalHeader = styled.div`
    position: relative;
    padding: 0px 15px;
    min-height: 50px;
    display: flex;
    align-items: center;
`;

export const ModalCloseButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    width: 35px;
    height: 35px;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.125);
`;

export const H4 = styled.h4`
    margin: 0;
`;

export const Hr = styled.div`
    background-color: rgba(0, 0, 0, 0.125);
    width: 95%;
    height: 0.5px;
    margin: 0 10px;
`;

export default Button;
