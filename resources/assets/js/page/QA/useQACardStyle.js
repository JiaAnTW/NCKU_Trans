import { useState, useEffect } from 'react';
import useWindowWidth from '../../utils/useWindowWidth';

const useQACardStyle = () => {
    const [fontSize, setFontSize] = useState('2.5rem');

    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (windowWidth > 860) {
            setFontSize('2.5rem');
        } else {
            setFontSize('2rem');
        }
    }, [windowWidth]);

    return { fontSize };
};

export default useQACardStyle;
