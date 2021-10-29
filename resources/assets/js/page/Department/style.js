import styled from 'styled-components';

export const DepartmentLayout = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    & * {
        font-size: 14px;
        font-family: 'Noto Sans TC', 'Microsoft JhengHei';
    }
`;

export const EditWindow = styled.div`
    display: flex;
    width: 375px;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
`;
