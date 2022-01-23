import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMajor } from '~/model/middleware/major';
import { majorDataSelector } from '~/model/selector/major';

function useFetchData({ overscanStopIndex, num, isAdmin }) {
    const dispatch = useDispatch();
    const majorData = useSelector(majorDataSelector);
    useEffect(() => {
        if (isAdmin) return;
        if (overscanStopIndex === majorData.length - 1) {
            dispatch(fetchMajor({ from: overscanStopIndex + 1, num }));
        }
    }, [majorData, overscanStopIndex, num, isAdmin]);
}

export default useFetchData;
