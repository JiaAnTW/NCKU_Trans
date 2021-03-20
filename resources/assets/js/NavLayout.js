import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';

import { Button } from '@/theme/global';
import SideBar from '@/components/SideBar';
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
            <Container>
                <nav>
                    <MenuIcon
                        style={MenuIconStyle}
                        onClick={() => setOpen(!open)}
                    />
                </nav>
                <Header>
                    <H1>轉系/輔系/雙主修</H1>
                </Header>
                {children}
            </Container>
        </div>
    );
}

export default NavLayout;
