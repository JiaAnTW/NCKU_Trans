import { useState, useEffect, useCallback } from 'react';

export default function useParentSize(ref) {
    const [parentWidth, setParentWidth] = useState(0);
    const [parentHeight, setParentHeight] = useState(0);

    const handleWindowResize = useCallback(() => {
        if (!ref.current) return;

        const parentNode = ref.current.parentNode;
        if (!parentNode || !parentNode.offsetWidth || !parentNode.offsetHeight)
            return;

        setParentWidth(parentNode.offsetWidth);
        setParentHeight(parentNode.offsetHeight);
    }, [ref]);

    useEffect(() => {
        // Init when first time render
        handleWindowResize();

        // Note: won't execute when first time render
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);

    return { parentWidth, parentHeight };
}
