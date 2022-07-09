import styled from 'styled-components';
import { color } from '~/theme/global';

export const DetailItemLayout = styled.div`
    min-width: 75px;
    height: 50px;
    padding: 5px;
    background-color: ${color.white};
    color: ${(props) =>
        props.type === '申請結果' &&
        (props.value === 'false' || props.value === '未通過')
            ? color.red
            : color.black};
`;

export const TypeText = styled.div`
    font-size: 1.4rem;
`;

export const ValueText = styled.div`
    font-size: 1.7rem;
    font-weight: 700;
`;
