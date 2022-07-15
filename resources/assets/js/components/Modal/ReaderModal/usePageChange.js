import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useModalOpen } from '~/utils';

function usePageChange() {
    const [, setIsModalOpen] = useModalOpen();
    const location = useLocation();

    useEffect(() => {
        if (!location.search) setIsModalOpen(false);
    }, [location]);
    return;
}

export default usePageChange;
