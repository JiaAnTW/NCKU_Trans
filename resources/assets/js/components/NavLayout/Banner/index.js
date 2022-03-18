import React from 'react';
import { useMedia } from '~/utils';
import MenuIcon from '@material-ui/icons/Menu';
import { MenuIconStyle } from '../style';
import Title from '../Title';
import { Nav } from './style';

function Banner({ open, setOpen, isShowSearch }) {
    const device = useMedia();

    if (device === 'PC') return <Title isShowSearch={isShowSearch} />;
    return (
        <Nav>
            <MenuIcon style={MenuIconStyle} onClick={() => setOpen(!open)} />
            <Title isShowSearch={isShowSearch} />
        </Nav>
    );
}

export default Banner;
