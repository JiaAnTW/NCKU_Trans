import { makeStyles } from '@material-ui/core/styles';
import CategoryIcon from '@material-ui/icons/Category';
import TimelineIcon from '@material-ui/icons/Timeline';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import styled from 'styled-components';
import { color } from '~/theme/global';

export const ItemFilterColContainer = styled.div`
    width: 105px;
    padding: 5px;

    &:not(:last-of-type) {
        border-right: 1px solid rgba(0, 0, 0, 0.05);
    }
`;

export const Title = styled.div`
    display: flex;
    color: ${color.darkYellow};
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

export const CategoriesIcon = styled(CategoryIcon)`
    margin-right: 10px;
    font-size: 14px;
`;

export const StatInfosIcon = styled(TimelineIcon)`
    margin-right: 10px;
    font-size: 14px;
`;

export const YearsIcon = styled(AccessAlarmIcon)`
    margin-right: 10px;
    font-size: 14px;
`;

export const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiIconButton-root': {
            padding: '5px 10px',
        },
        '& .MuiSvgIcon-root': {
            height: 18,
            width: 18,
        },
        '& .Mui-checked': {
            color: color.yellow,
        },
    },
    filterItem: {
        marginRight: 0,
        justifyContent: 'center',
    },
    label: {
        fontSize: 14,
        width: 60,
    },
}));
