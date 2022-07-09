import styled from 'styled-components';
import Button from '~/components/atom/Button';

export const ItemFilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    width: 342px;
`;

export const ButonContainer = styled.div`
    text-align: right;
`;

export const StyledButton = styled(Button)`
    margin-right: 15px;
    width: 60px;
    color: #1d1e22;
    cursor: pointer;
    background-color: #feda6a;
`;
