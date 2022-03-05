import styled from 'styled-components';

export const ColumnContainer = styled.div`
    width: 75px;
    padding: 15px;
    text-align: center;
    &:not(:last-of-type) {
        border-right: 1px solid rgba(0, 0, 0, 0.05);
    }
`;

export const FixHeightContainer = styled.div`
    height: 42px;
    margin-top: 15px;

    justify-content: center;
    display: flex;
    flex-direction: column;
`;

export const Title = styled.div`
    font-size: 16px;
    line-height: 18px;
`;

export const DataType = styled.div`
    font-size: 24px;
    line-height: 28px;
    color: #8c8c8c;
    text-align: center;
`;

export const DataTypeRemark = styled.div`
    font-size: 12px;
    line-height: 14px;
    color: #8c8c8c;
    text-align: center;
`;

export const Number = styled(FixHeightContainer)`
    font-size: 36px;
    color: #e1af13;
`;
