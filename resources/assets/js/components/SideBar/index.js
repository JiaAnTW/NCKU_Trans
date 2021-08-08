import React, { useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
//import ListItemText from '@material-ui/core/ListItemText';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import SchoolIcon from '@material-ui/icons/School';
import PostAddIcon from '@material-ui/icons/PostAdd';

import { DrawerContent, useStyle, ListItemText } from './style';

import { useMedia } from '@/utils/index';

const drawerWidth = 110;

const arr = [
    {
        text: '轉輔雙主',
        icon: (
            <ImportContactsIcon style={{ width: '1.9rem', height: '1.9rem' }} />
        ),
        url: '/',
    },
    /*{
        text: '其他學業',
        icon: <SchoolIcon style={{ width: '1.9rem', height: '1.9rem' }} />,
        url: '/study',
    },*/
    {
        text: '我要分享',
        icon: <PostAddIcon style={{ width: '1.9rem', height: '1.9rem' }} />,
        url: '/post',
    },
];

export default function SideBar({ open, onClose, onOpen }) {
    const classes = useStyle();
    const device = useMedia();

    const location = useLocation();

    const history = useHistory();

    const handleClick = useCallback(
        (url) => {
            history.push(url);
            if (device !== 'PC') onClose();
        },
        [history, device, onClose]
    );

    const toggleDrawer = () => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        onClose();
    };

    useEffect(() => {
        if (device !== 'PC') onClose();
        else if (device === 'PC') onOpen();
    }, [device]);

    return (
        <Drawer
            anchor="left"
            className={classes.drawer}
            variant={device === 'PC' ? 'persistent' : 'temporary'}
            open={open}
            onClose={toggleDrawer('left', false)}
            style={{ width: open ? drawerWidth : 0 }}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <DrawerContent>
                <List>
                    {arr.map((item, index) => (
                        <ListItem
                            button
                            key={item.text}
                            className={classes.listItem}
                            onClick={() => handleClick(item.url)}
                        >
                            <ListItemIcon
                                className={
                                    location.pathname === item.url
                                        ? classes.listItemIconSelected
                                        : classes.listItemIcon
                                }
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText>{item.text}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </DrawerContent>
        </Drawer>
    );
}
