import React, { useState } from 'react';

import SideBar from '~/components/SideBar';
import Notification from './Notification';
import { Container } from './style';
import Banner from './Banner';
import { useLocation } from 'react-router-dom';

const switchOfSearchBar = new Set('/');

function NavLayout({ children }) {
    const [open, setOpen] = useState(true);
    const location = useLocation();

    return (
        <div style={{ display: 'flex' }}>
            <SideBar
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            />
            <Notification />
            <Container isShowSearch={switchOfSearchBar.has(location.pathname)}>
                <Banner
                    isShowSearch={switchOfSearchBar.has(location.pathname)}
                    open={open}
                    setOpen={setOpen}
                />
                {children}
            </Container>
        </div>
    );
}

export default NavLayout;
