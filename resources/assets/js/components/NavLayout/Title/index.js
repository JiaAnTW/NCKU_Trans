import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { H1, Header, Search } from './style';
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

function Title({ isShowSearch }) {
    const location = useLocation();
    const { id } = useParams();

    const TitleElement = id ? H2 : H1;
    return (
        <Header>
            <TitleElement>{mapPathnameToTitle(location.pathname)}</TitleElement>
            <Search isShow={isShowSearch} />
        </Header>
    );
}

export default Title;
