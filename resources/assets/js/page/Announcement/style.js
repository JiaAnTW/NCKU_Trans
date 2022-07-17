import styled from 'styled-components';
import { color, Button } from '~/theme/global';

export const AnnounceLayout = styled.div`
    min-width: 350px;
    width: 85%;
    max-width: 1050px;
`;

export const ToggleLayout = styled.div`
    height: 50px;
    display: flex;
    align-items: center;

    & .react-toggle {
        margin-left: 10px;
    }

    & .react-toggle-track {
        width: 70px;
    }

    & .react-toggle-track-x,
    & .react-toggle-track-check {
        width: 32.5px;
        height: 20px;
        line-height: 17.5px;
        color: ${color.white};
    }

    & .react-toggle--checked .react-toggle-thumb {
        left: 45px;
    }
`;

export const ToggleLabel = styled.div`
    height: 50px;
    display: flex;
    align-items: center;

    & .react-toggle-track {
        width: 70px;
    }
`;

export const TextArea = styled.textarea`
    min-width: 350px;
    height: 150px;
    width: 100%;
    padding: 10px 15px;
    border-radius: 5px;
    resize: none;
`;

export const SubmitButton = styled(Button)`
    height: 35px;
    float: right;
    margin-top: 10px;
    margin-left: 10px;
    padding: 0px 15px;
`;
