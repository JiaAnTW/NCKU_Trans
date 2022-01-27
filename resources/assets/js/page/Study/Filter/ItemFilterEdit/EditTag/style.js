import styled from 'styled-components';
import { color } from '~/theme/global';
import Button from '~/components/atom/Button';

export const EditTagContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10px 15px 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`;

export const ToolsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding-top: 20px;
`;

export const ToolButton = styled(Button)`
    align-items: center;
    justify-content: center;
    display: flex;

    padding: 15px 22px;
    width: 70px;
    height: 30px;
    margin-left: 3px;
    border-radius: 10px;

    font-size: 12px;
    color: #393f4d;
    background-color: ${(props) =>
        props.action === 'delete'
            ? 'rgb(229,68,109)'
            : props.action === 'cancel'
            ? 'white'
            : color.yellow};
    cursor: pointer;
    user-select: none;
`;
