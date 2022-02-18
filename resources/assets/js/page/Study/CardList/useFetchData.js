import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudy } from '~/model/middleware/study';
import { studyDataSelector } from '~/model/selector/study';

function useFetchData({ overscanStopIndex, num, isAdmin }) {
    const dispatch = useDispatch();
    const studyData = useSelector(studyDataSelector);
    useEffect(() => {
        if (isAdmin) return;
        if (overscanStopIndex === studyData.length - 1) {
            dispatch(fetchStudy({ from: overscanStopIndex + 1, num }));
        }
    }, [studyData, overscanStopIndex, num, isAdmin]);
}

export default useFetchData;
