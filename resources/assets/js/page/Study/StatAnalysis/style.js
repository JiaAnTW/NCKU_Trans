import styled from 'styled-components';

export const StatAnalysisContainer = styled.section`
    display: ${(props) => (props.isShow ? 'flex' : 'none')};
    flex-direction: row;
    margin-left: 15px;
    padding: 15px 5px;

    height: fit-content;

    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 5px;
`;
