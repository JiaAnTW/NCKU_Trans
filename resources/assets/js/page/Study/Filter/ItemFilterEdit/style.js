import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import { color } from '~/theme/global';

export const ManageButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);

    margin-top: -8px;
    padding: 9.5px 0;
    font-size: 14px;
    line-height: 16px;
    width: 342px;

    cursor: pointer;
    user-select: none;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`;

export const StartManageIcon = styled(EditIcon)`
    margin-right: 14px;
`;

export const StopManageIcon = styled(CloseIcon)`
    margin-right: 14px;
`;

export const ItemFilterEditContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    height: 189px;
    width: 342px;
`;

export const FilterEditDisabledContainer = styled.div`
    position: absolute;
    width: 105px;
    height: 200px;
    padding-left: 5px;

    background: rgba(255, 255, 255, 0.8);
    z-index: 999;
`;

export const FilterDisabledText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 14px;
    width: 100%;
    text-align: center;
`;

export const AddItemButton = styled.button`
    font-size: 11px;
    line-height: 13px;
    padding: 7px 16px;

    display: flex;
    justify-content: center;

    color: ${color.darkYellow};
    background-color: ${color.white};
    border: 2px dashed ${color.yellow};
    box-sizing: border-box;
    border-radius: 5px;

    cursor: pointer;
`;

export const AddItemIcon = styled(AddIcon)`
    height: 10px;
    width: 10px;
    margin-right: 2px;
`;
