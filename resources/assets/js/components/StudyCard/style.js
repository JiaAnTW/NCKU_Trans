import styled from 'styled-components';
import Badge from '~/components/atom/Badge';
import { color, colorMap } from '~/theme/global';

export const Card = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    border-left: 0;
    box-sizing: border-box;
    background-color: ${({ isConfirmed }) =>
        isConfirmed ? color.white : color.lightYellow};

    @media (max-width: 576px) {
        width: 100%;
        margin: 0;
        border-radius: 0;
        height: 145px;
    }
`;

export const BadgeList = styled.div`
    display: inline-flex;
`;

export const StatisticBadge = styled(Badge)`
    margin-right: 5px;
`;

export const CardTitle = styled.h4`
    font-size: 18px;
    margin-top: 12px;
    margin-bottom: 6px;
`;

export const CardSubTitle = styled.div`
    color: ${color.darkGray};
    font-size: 1.2rem;
`;

export const CardText = styled.p`
    font-size: 14px;
    text-align: justify;
    line-break: anywhere;
    margin-top: 0;
    margin-bottom: 1rem;

    @media (max-width: 576px) {
        font-size: 1.5rem;
    }
`;

export const CardContent = styled.div`
    width: 100%;
    height: 88px;
    margin-top: 20px;
`;

export const TypeIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    background-color: ${({ theme }) => colorMap[theme].backgroundColor};
    color: ${({ theme }) => colorMap[theme].color};
    grid-area: icon;
    width: 42px;
    height: 42px;
    border-radius: 42px;
    margin: 10px auto;
`;

export const ContentInfo = styled.div`
    display: grid;
    grid-template-rows: 35px 25px auto;
`;

export const TagSpanList = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
`;

export const TagSpan = styled.span`
    color: ${color.yellow};
    margin-right: 15px;
    font-size: 14px;
`;

export const YearSpan = styled(TagSpan)`
    margin: auto;
`;

export const ShowBtn = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 75%;
    opacity: 0;
    border: none;
    outline: none;
`;
