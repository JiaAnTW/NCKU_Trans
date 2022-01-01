import React, { useCallback, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';

import SideBar from '~/components/SideBar';
import Notification from './Notification';
import Title from './Title';
import { H1, Header, Container, MenuIconStyle } from './style';
import useMedia from '~/utils/useMedia';

function NavLayout({ children }) {
    const [open, setOpen] = useState(true);
    const device = useMedia();
    const Header = useCallback(() => {
        if (device === 'PC') return <Title />;
        return (
            <nav>
                <MenuIcon
                    style={MenuIconStyle}
                    onClick={() => setOpen(!open)}
                />
                <Title />
            </nav>
        );
    }, [device, open, setOpen]);

    return (
        <div style={{ display: 'flex' }}>
            <SideBar
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            />
            <Notification />
            <Container>
                <Header />
                {children}
            </Container>
        </div>
    );
}

export default NavLayout;
