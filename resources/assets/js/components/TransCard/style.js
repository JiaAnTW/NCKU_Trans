import styled from 'styled-components';
import { color, colorMap } from '~/theme/global';

export const CARD_WIDTH_PC = 220;
export const CARD_HEIGHT_PC = 180;
export const CARD_HEIGHT_MOBILE = 145;

export const Card = styled.div`
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.125);
    padding: 5px;
    background-color: ${(props) =>
        props.dark ? color.lightYellow : color.white};
    color: ${color.black};
    border-radius: 15px;
    height: ${CARD_HEIGHT_PC}px;
    width: ${CARD_WIDTH_PC}px;
    box-sizing: border-box;

    @media (max-width: 576px) {
        width: 100%;
        margin: 0;
        border-radius: 0;
        height: ${CARD_HEIGHT_MOBILE}px;
    }
`;

export const CardTitle = styled.h4`
    font-size: 1.8rem;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 1.1;
`;

export const CardSubTitle = styled.div`
    color: ${color.darkGray};
    font-size: 1.2rem;
`;

export const CardText = styled.p`
    font-size: 1.3rem;
    text-align: justify;
    line-break: anywhere;
    margin-top: 0;
    margin-bottom: 1rem;

    @media (max-width: 576px) {
        font-size: 1.5rem;
    }
`;

export const CardContent = styled.div`
    display: grid;
    box-sizing: border-box;
    grid-template-columns: 57px auto;
    grid-template-rows: auto 30px;
    grid-template-areas:
        'icon main'
        'tags tags';
    width: 210px;
    height: 160px;
    padding: 5px 10px;
    padding-bottom: 0;
    @media (max-width: 576px) {
        width: 100%;
        height: 125px;
    }
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
    display: flex;
    align-items: center;
`;

export const TagSpan = styled.span`
    color: ${({ theme }) =>
        colorMap[theme].color === color.white
            ? colorMap[theme].backgroundColor
            : colorMap[theme].color};
    margin-right: 10px;
    font-size: 1.2rem;
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
