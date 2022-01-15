import styled from 'styled-components';
import { color } from '~/theme/global';

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
export const AvatarLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    opacity: ${(props) => (props.selected ? 1 : 0.5)};
    display: ${(props) => (props.index ? 'block' : 'none')};
    margin: 10px;
`;

export const AvatarText = styled.div`
    width: 316px;
    height: 42px;
    text-align: center;
`;
