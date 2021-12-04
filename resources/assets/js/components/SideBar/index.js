import React, { useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { DrawerContent, useStyle, ListItemText } from './style';
import { routers, adminRouters } from './routes';

import { useMedia } from '~/utils/index';

const drawerWidth = 110;

export default function SideBar({ open, onClose, onOpen }) {
    const classes = useStyle();
    const device = useMedia();

    const location = useLocation();

    const history = useHistory();
    const arr = location.pathname.startsWith('/admin/')
        ? adminRouters
        : routers;

    const handleClick = useCallback(
        (url) => {
            // 問卷
            if (url[0] !== '/') {
                window.open(url, '_blank').focus();
                return;
            }

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
                <List component="nav">
                    {arr.map((item, index) => (
                        <ListItem
                            button
                            key={item.text}
                            className={classes.listItem}
                            component="a"
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
