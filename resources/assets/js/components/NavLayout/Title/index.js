import React from 'react';
import { useLocation } from 'react-router-dom';

import { H1, Header } from './style';

const mapPathnameToTitle = (pathname) => {
    const prefix = pathname.split('/');

    switch (prefix[1]) {
        case 'major':
            return '轉系/輔系/雙主修心得';
        case 'study':
            return '綜合學業心得';
        case 'post':
            return '分享心得';
        default:
            return '轉系/輔系/雙主修心得';
    }
};

function Title() {
    const location = useLocation();
    return (
        <Header>
            <H1>{mapPathnameToTitle(location.pathname)}</H1>
        </Header>
    );
}

export default Title;
