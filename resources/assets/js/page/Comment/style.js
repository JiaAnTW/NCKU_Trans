import styled from 'styled-components';

const CommentSection = styled.div`
    display: grid;
    grid-template-rows: 150px auto;
    padding: 25px 45px;
`;

const StatisticContainer = styled.div`
    width: 100%;
    height: 125px;
`;

const CommentIndex = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
`;

export { CommentSection, StatisticContainer, CommentIndex };
