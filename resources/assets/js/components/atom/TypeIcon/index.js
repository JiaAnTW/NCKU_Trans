import styled from 'styled-components';
import { colorMap } from '@/theme/global';

export default styled.div`
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
