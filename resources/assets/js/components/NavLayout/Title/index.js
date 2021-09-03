import React from 'react';
import { useLocation } from 'react-router-dom';

import { H1, Header } from './style';
import titleWording from './title.json';

const mapPathnameToTitle = (pathname) => {
    try {
        const prefix = pathname.split('/');
        if (prefix[1] === 'admin') {
            return titleWording['backstage'][prefix[2]];
        }

        if (titleWording['normal'][prefix[1]]) {
            return titleWording['normal'][prefix[1]];
        }

        return '404 不存在的頁面';
    } catch (e) {
        return '404 不存在的頁面';
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
