import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { fetchAnnouncement } from '~/model/middleware/announcement';

export default function useInitNotification() {
    const dispatch = useDispatch();

    const checkLocalStorage = useCallback({}, []);

    useEffect(() => {
        dispatch(fetchAnnouncement());
    }, [dispatch]);
}
