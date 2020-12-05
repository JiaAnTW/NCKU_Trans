import { useState, useEffect, useCallback } from 'react';

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleWindowWidth = useCallback(() => {
        setWindowWidth(window.innerWidth);
    }, [setWindowWidth]);

    useEffect(() => {
        window.addEventListener('resize', handleWindowWidth);
        return () => {
            window.removeEventListener('resize', handleWindowWidth);
        };
    }, []);

    return windowWidth;
};

export default useWindowWidth;
