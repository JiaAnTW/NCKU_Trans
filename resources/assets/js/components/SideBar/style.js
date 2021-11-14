import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { color } from '~/theme/global';

export const useStyle = makeStyles((theme) => ({
    root: {
        zIndex: 3,
    },
    drawer: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        zIndex: 3,
    },
    drawerPaper: {
        width: 110,
    },
    listItem: {
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    listItemIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '35px',
        height: '35px',
        color: color.yellow,
        marginBottom: '5px',
        borderRadius: '10px',
    },
    listItemIconSelected: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '35px',
        height: '35px',
        backgroundColor: color.yellow,
        color: color.white,
        marginBottom: '5px',
        borderRadius: '10px',
    },
    icon: {
        width: '1.9rem',
        height: '1.9rem',
    },
    listItemText: {
        zIndex: '2',
        fontSize: '1.9rem',
    },
}));

export const DrawerContent = styled.div`
    background-color: ${color.white};
    height: 100%;
`;

export const SelectContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 95%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 4fr 1fr;
`;

export const SelectTop = styled.div`
    background-color: ${color.yellow};
`;

export const SelectMid = styled.div`
    background-color: ${color.white};
    clip-path: inset(0% 0% 0% 20% round 250px 5% 0% 250px);
`;

export const SelectBot = styled.div`
    background-color: ${color.yellow};
`;

export const ListItemText = styled.span`
    font-size: 1.4rem;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
`;
