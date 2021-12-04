import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import SchoolIcon from '@material-ui/icons/School';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export const routers = [
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

export const adminRouters = [
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
