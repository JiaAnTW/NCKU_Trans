import styled from 'styled-components';
import { color } from '@/theme/global';

export const ProgressLayout = styled.div`
    position: relative;
    width: 115px;
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
`;

export const ProgressValueText = styled.span`
    position: absolute;
    top: 21px;
    font-size: 1.9rem;
    display: flex;
    width: 100%;
    justify-content: center;
    color: ${color.darkBlack};
`;

export const TypeText = styled.h4`
    display: flex;
    justify-content: center;
    font-size: 1.4rem;
    margin: 7px 0;
`;
