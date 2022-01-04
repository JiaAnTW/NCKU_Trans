import React, { useState } from 'react';

import SideBar from '~/components/SideBar';
import Notification from './Notification';
import { Container } from './style';
import Banner from './Banner';

function NavLayout({ children }) {
    const [open, setOpen] = useState(true);

    return (
        <div style={{ display: 'flex' }}>
            <SideBar
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            />
            <Notification />
            <Container>
                <Banner open={open} setOpen={setOpen} />
                {children}
            </Container>
        </div>
    );
}

export default NavLayout;
