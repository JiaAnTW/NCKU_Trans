import { useState, useEffect, useCallback } from 'react';

export default function useParentSize(ref) {
    const [parentWidth, setParentWidth] = useState(0);
    const [parentHeight, setParentHeight] = useState(0);

    const handleWindowReSize = useCallback(() => {
        if (!ref.current) return;

        const parentNode = ref.current.parentNode;
        if (!parentNode || !parentNode.offsetWidth || !parentNode.offsetHeight)
            return;

        setParentWidth(parentNode.offsetWidth);
        setParentHeight(parentNode.offsetHeight);
    }, [ref]);

    useEffect(() => {
        // Init when first time render
        handleWindowReSize();

        // Note: won't when first time render
        window.addEventListener('resize', handleWindowReSize);
        return () => {
            window.removeEventListener('resize', handleWindowReSize);
        };
    }, [handleWindowReSize]);

    return { parentWidth, parentHeight };
}
