import styled from 'styled-components';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { color, Button } from '@/theme/global';

export const ThankYouLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const ThankYouIcon = styled(EmojiPeopleIcon)`
    color: ${color.yellow};
    font-size: 12rem;
`;

export const Title = styled.h4`
    text-align: center;
    font-size: 2.5rem;
`;

export const Subtitle = styled.div`
    text-align: center;
    color: ${color.darkGray};
    font-size: 1.4rem;
`;

export const BackButton = styled(Button)`
    height: 40px;
    width: 150px;
    margin-top: 35px;
`;
