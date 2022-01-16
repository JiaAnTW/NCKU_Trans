import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { DrawerContent, useStyle, ListItemText } from './style';
import { routers, adminRouters } from './routes';

import { useMedia } from '~/utils/index';
import useSideBarEffect from './useSideBarEffect';
import useSideBarClick from './useSideBarClick';

const drawerWidth = 110;

export default function SideBar({ open, onClose, onOpen }) {
    const classes = useStyle();
    const device = useMedia();
    const location = useLocation();

    const { handleClick, handleToggle } = useSideBarClick({ device, onClose });
    useSideBarEffect({ device, onClose, onOpen });

    const arr = useMemo(
        () =>
            location.pathname.startsWith('/admin/') ? adminRouters : routers,
        [location]
    );

    return (
        <Drawer
            anchor="left"
            className={classes.drawer}
            variant={device === 'PC' ? 'persistent' : 'temporary'}
            open={open}
            onClose={handleToggle('left', false)}
            style={{ width: open ? drawerWidth : 0 }}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <DrawerContent>
                <List component="nav">
                    {arr.map((item) => (
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
