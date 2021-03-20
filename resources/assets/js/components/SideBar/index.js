import React, { useEffect } from 'react';
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

const drawerWidth = 200;

const arr = [
    {
        text: '轉輔雙主心得',
        icon: (
            <ImportContactsIcon style={{ width: '1.9rem', height: '1.9rem' }} />
        ),
    },
    {
        text: '其他學業心得',
        icon: <SchoolIcon style={{ width: '1.9rem', height: '1.9rem' }} />,
    },
    {
        text: '我要分享心得',
        icon: <PostAddIcon style={{ width: '1.9rem', height: '1.9rem' }} />,
    },
];

export default function SideBar({ open, onClose, onOpen }) {
    const classes = useStyle();
    const device = useMedia();

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
                        >
                            <ListItemIcon className={classes.listItemIcon}>
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
