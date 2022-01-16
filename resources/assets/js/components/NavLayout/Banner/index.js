import React from 'react';
import { useMedia } from '~/utils';
import MenuIcon from '@material-ui/icons/Menu';
import { MenuIconStyle } from '../style';
import Title from '../Title';
import { Nav } from './style';

function Banner({ open, setOpen }) {
    const device = useMedia();

    if (device === 'PC') return <Title />;
    return (
        <Nav>
            <MenuIcon style={MenuIconStyle} onClick={() => setOpen(!open)} />
            <Title />
        </Nav>
    );
}

export default Banner;
