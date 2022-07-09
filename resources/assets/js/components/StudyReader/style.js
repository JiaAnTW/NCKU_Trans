import styled from 'styled-components';
import { color } from '~/theme/global';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

export const StudyReaderLayout = styled.div`
    display: grid;
    grid-template-columns: 50px auto 50px;
    grid-template-rows: ${({ isAdmin }) =>
        isAdmin ? '30px calc(100% - 30px)' : '100%'};
    width: 600px;
    height: 90vh;
    background-color: ${color.white};

    @media (max-width: 992px) {
        width: 360px;
        height: 85vh;
        min-width: 95vw;
    }
`;
export const ArrowIcon = styled(NavigateBeforeIcon)`
    transform: ${({ direction }) =>
        direction === 'left' ? 'none' : 'rotate(180deg)'};
`;
export const StudyReaderContent = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    grid-column-start: 2;
    padding: 25px 0px;
`;
export const StudyReaderContext = styled.div`
    height: 100%;
    margin: 5px 0px;
    text-align: justify;

    line-height: 2.8rem;
    letter-spacing: 2.5px;
    overflow-y: auto;
    line-break: anywhere;
    white-space: pre-line;

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
