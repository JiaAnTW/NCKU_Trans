import { useState, useEffect } from 'react';
import { useWindowWidth } from './index';

function useMedia() {
    const [device, setDevice] = useState('PC');
    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (windowWidth > 992 && device !== 'PC') setDevice('PC');
        else if (windowWidth <= 992 && windowWidth > 576 && device !== 'tablet')
            setDevice('tablet');
        else if (windowWidth <= 576 && device !== 'mobile') setDevice('mobile');
    }, [windowWidth, device]);

    return device;
}

export default useMedia;
