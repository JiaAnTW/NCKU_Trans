import React, { useState } from 'react';

import SideBar from '~/components/SideBar';
import Notification from './Notification';
import { Container } from './style';
import Banner from './Banner';
import { useLocation } from 'react-router-dom';

const switchOfSearchBar = ['/study'];

function NavLayout({ children }) {
    const [open, setOpen] = useState(true);
    const location = useLocation();
    const isShowSearch = switchOfSearchBar.includes(location.pathname);
    return (
        <div style={{ display: 'flex' }}>
            <SideBar
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            />
            <Notification />
            <Container isShowSearch={isShowSearch}>
                <Banner
                    isShowSearch={isShowSearch}
                    open={open}
                    setOpen={setOpen}
                />
                {children}
            </Container>
        </div>
    );
}

export default NavLayout;
