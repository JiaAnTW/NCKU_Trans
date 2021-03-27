import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import { color } from '@/theme/global';

export const TypeSelectLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 25px;
`;

export const Title = styled.p`
    display: flex;
    justify-content: center;
    color: ${color.darkGray};
`;

export const AvatarList = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AvatarYellow = styled(Avatar)`
    height: 70px;
    width: 70px;
    background-color: ${color.yellow};
    margin: 5px;
    & svg {
        font-size: 30px;
    }
`;

export const AvatarLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: ${(props) => (props.selected ? 1 : 0.5)};
    margin: 10px;
`;

export const AvatarText = styled.span``;
