import styled from 'styled-components';

export const Title = styled.p`
    display: ${(props) => (props.display ? props.display : 'flex')};
    font-size: ${(props) => (props.size ? props.size : '15px')};
    justify-content: ${(props) => (props.align ? props.align : 'center')};
    color: ${(props) =>
        props.color
            ? props.color
            : 'rgba(0, 0, 0, 0.54)'}; // the color global theme doesn't exist
`;
