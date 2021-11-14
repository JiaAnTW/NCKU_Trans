import styled from 'styled-components';
import TypeIcon from '~/components/atom/TypeIcon';
import { color } from '~/theme/global';

export const TitleBarLayout = styled.div`
    display: flex;
    align-items: center;
`;

export const TypeIconLarge = styled(TypeIcon)`
    margin: 0;
    transform: scale(1.1);
`;

export const TitleLayout = styled.div`
    margin-left: 10px;
`;

export const Title = styled.h4`
    margin: 0;
    font-size: 1.9rem;
    margin-bottom: 5px;
`;

export const Subtitle = styled.p`
    font-size: 1.3rem;
    margin: 0;
    color: ${color.darkGray};
`;
