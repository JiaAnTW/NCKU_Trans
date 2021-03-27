import React from 'react';
import styled from 'styled-components';

const ButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: ${(props) => (props.onClick ? '' : 'hidden')};

    :hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

const Triangle = styled.div`
    border-right: 2px solid gray;
    border-top: 2px solid gray;
    height: 30px;
    width: 30px;
    border-left: 1px solid transparent;
    border-bottom: 1px solid transparent;
    display: inline-block;
    transform: ${(props) =>
        props.direction === 'left' ? 'rotate(225deg)' : 'rotate(45deg)'};
`;

function ChangeBtn({ direction, onClick }) {
    return (
        <ButtonDiv onClick={onClick}>
            <Triangle direction={direction} />
        </ButtonDiv>
    );
}

export default ChangeBtn;
