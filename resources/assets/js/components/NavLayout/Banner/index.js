import React from 'react';
import { useMedia } from '~/utils';
import MenuIcon from '@material-ui/icons/Menu';
import { MenuIconStyle } from '../style';
import Title from '../Title';

function Banner({ open, setOpen }) {
    const device = useMedia();

    if (device === 'PC') return <Title />;
    return (
        <nav>
            <MenuIcon style={MenuIconStyle} onClick={() => setOpen(!open)} />
            <Title />
        </nav>
    );
}

export default Banner;
