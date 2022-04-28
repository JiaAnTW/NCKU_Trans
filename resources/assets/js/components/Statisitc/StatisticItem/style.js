import styled from 'styled-components';

export const Type = styled.div`
    padding-top: 7px;
    font-size: 18px;
    color: #8c8c8c;
    border-right: rgba(0, 0, 0, 0.13) 1px solid;
    box-sizing: border-box;
    width: 105px;
    text-align: center;
`;
export const Value = styled.div`
    padding-top: 7px;
    font-size: 18px;
    color: #e1af13;

    ${({ last }) =>
        !last
            ? '\
        border-right: rgba(0, 0, 0, 0.13) 1px solid;\
        box-sizing: border-box;\
        width: 105px;\
        text-align: center;\
    '
            : ''}
`;
