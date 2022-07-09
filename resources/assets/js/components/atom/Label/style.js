import styled from 'styled-components';
import { color } from '~/theme/global';

export const Title = styled.div`
    display: ${(props) => (props.display ? props.display : 'flex')};
    position: relative;
    font-size: ${(props) => (props.size ? props.size : '15px')};
    justify-content: ${(props) => (props.align ? props.align : 'center')};
    color: ${(props) =>
        props.color
            ? props.color
            : 'rgba(0, 0, 0, 0.54)'}; // the color global theme doesn't exist
`;

export const DeleteButton = styled.button`
    color: ${color.red};
    position: absolute;
    right: 0;
    background-color: transparent;
    border: none;
    outline: none;
`;
