import React from 'react';

import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import SchoolIcon from '@material-ui/icons/School';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const iconStyle = { width: '1.9rem', height: '1.9rem' };

export const routers = [
    {
        text: '學業心得',
        icon: <SchoolIcon style={iconStyle} />,
        url: '/',
    },
    {
        text: '轉輔雙主',
        icon: <ImportContactsIcon style={iconStyle} />,
        url: '/major',
    },
    {
        text: '我要分享',
        icon: <PostAddIcon style={iconStyle} />,
        url: '/post',
    },
    {
        text: '聯絡我們',
        icon: <HowToVoteIcon style={iconStyle} />,
        url: 'https://forms.gle/qqrnLmhQoLyZ1BULA',
    },
];

export const adminRouters = [
    {
        text: '審查學業',
        icon: <SchoolIcon style={iconStyle} />,
        url: '/admin/study',
    },
    {
        text: '審查轉輔轉',
        icon: <ImportContactsIcon style={iconStyle} />,
        url: '/admin/major',
    },
    {
        text: '學院系設定',
        icon: <SettingsIcon style={iconStyle} />,
        url: '/admin/department',
    },
    {
        text: '公告設定',
        icon: <ErrorOutlineIcon style={iconStyle} />,
        url: '/admin/announcement',
    },
    {
        text: '回到首頁',
        icon: <HomeIcon style={iconStyle} />,
        url: '/',
    },
];
