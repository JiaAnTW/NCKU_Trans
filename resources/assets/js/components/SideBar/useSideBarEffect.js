import { useEffect } from 'react';

export default function useSideBarEffect({ device, onClose, onOpen }) {
    useEffect(() => {
        if (device !== 'PC') onClose();
        else if (device === 'PC') onOpen();
    }, [device]);
}
