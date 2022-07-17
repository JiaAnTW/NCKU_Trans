import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useModalOpen } from '~/utils';

function usePageChange() {
    const [, setIsModalOpen] = useModalOpen();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (!location.search || !params.get('id')) setIsModalOpen(false);
    }, [location, setIsModalOpen]);
    return;
}

export default usePageChange;
