import styled from 'styled-components';
import { color } from '@/theme/global';

export default styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    background-color: rgba(254, 218, 106, 0.4);
    color: ${color.darkYellow};
    grid-area: icon;
    width: 42px;
    height: 42px;
    border-radius: 42px;
    margin: 10px auto;
`;
