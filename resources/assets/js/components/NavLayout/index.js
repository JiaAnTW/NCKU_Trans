import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';

import SideBar from '~/components/SideBar';
import Notification from './Notification';
import Title from './Title';
import { H1, Header, Container, MenuIconStyle } from './style';

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
                <nav>
                    <MenuIcon
                        style={MenuIconStyle}
                        onClick={() => setOpen(!open)}
                    />
                </nav>
                <Title />
                {children}
            </Container>
        </div>
    );
}

export default NavLayout;
