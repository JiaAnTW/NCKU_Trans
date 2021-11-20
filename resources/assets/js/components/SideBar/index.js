import React, { useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import SchoolIcon from '@material-ui/icons/School';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { DrawerContent, useStyle, ListItemText } from './style';

import { useMedia } from '~/utils/index';

const drawerWidth = 110;

const routers = [
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
    {
        text: '聯絡我們',
        icon: <HowToVoteIcon style={{ width: '1.9rem', height: '1.9rem' }} />,
        url: 'https://forms.gle/qqrnLmhQoLyZ1BULA',
    },
];

const adminRouters = [
    {
        text: '回到首頁',
        icon: <HomeIcon style={{ width: '1.9rem', height: '1.9rem' }} />,
        url: '/',
    },
    {
        text: '審查轉輔雙心得',
        icon: (
            <ImportContactsIcon style={{ width: '1.9rem', height: '1.9rem' }} />
        ),
        url: '/admin/major',
    },
    /*{
        text: '其他學業',
        icon: <SchoolIcon style={{ width: '1.9rem', height: '1.9rem' }} />,
        url: '/study',
    },*/
    {
        text: '學院系設定',
        icon: <SettingsIcon style={{ width: '1.9rem', height: '1.9rem' }} />,
        url: '/admin/department',
    },
    {
        text: '公告設定',
        icon: (
            <ErrorOutlineIcon style={{ width: '1.9rem', height: '1.9rem' }} />
        ),
        url: '/admin/announcement',
    },
];

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
