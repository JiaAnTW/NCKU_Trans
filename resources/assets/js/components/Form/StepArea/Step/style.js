import styled from 'styled-components';

export const StepContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 150px;
`;

export const NumberBox = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 30px;
    color: ${(props) => (props.active ? 'white' : 'rgba(0, 0, 0, 0.2)')};
    border: 3px solid;
    border-color: ${(props) => (props.active ? 'white' : 'rgba(0, 0, 0, 0.2)')};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Description = styled.span`
    margin-top: 5px;
    color: ${(props) => (props.active ? 'white' : 'rgba(0, 0, 0, 0.2)')};
`;
