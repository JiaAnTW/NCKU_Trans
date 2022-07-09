import styled from 'styled-components';
import { color } from '~/theme/global';

export const TableContainer = styled.div`
    background-color: ${color.lightGray};
`;

export const Row = styled.div`
    display: flex;
    font-size: 18px;
    text-align: center;
    justify-content: space-between;
    height: 45px;
    margin-bottom: 10px;
    background-color: ${(props) =>
        props.color ? props.color : color.darkYellow};
`;

export const NameBox = styled.div`
    flex-basis: 38%;
    width: 40%;
`;

export const ValueBox = styled.div`
    flex-basis: 38%;
    width: 40%;
`;

export const StudyIDBox = styled.div`
    width: 5%;
`;

export const ResetBox = styled.div`
    width: 5%;
`;

export const SelectBox = styled.div`
    width: 5%;
`;

export const DeleteBox = styled.div`
    width: 5%;
`;
