import styled from 'styled-components';
export const TypeButtonList = styled.div`
    display: flex;
    margin: auto;
`;
export const BoxList = styled.div`
    display: flex;
    margin: auto;
`;
export const SmallYellowBox = styled.div`
    width: 32px;
    height: 6px;
    background-color: #feda6a;
    opacity: ${(props) => (props.selected ? 1 : 0.5)};
    margin: 10px;
`;
export const SwitchButton = styled.div`
    width: 84px;
    height: 16px;
    background-color: ${(props) => (props.selected ? '#FFFFF' : '#FEDA6A')};
    color: ${(props) => (props.selected ? '#FEDA6A' : '#393F4D')};
    font-size: 14px;
    padding: 10px;
    border-radius: 50px;
    border: 3px solid #feda6a;
    margin: 10px;
`;
