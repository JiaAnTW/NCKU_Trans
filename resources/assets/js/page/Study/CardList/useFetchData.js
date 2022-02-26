import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudy, fetchStudyAdmin } from '~/model/middleware/study';
import { studyDataSelector } from '~/model/selector/study';

function useFetchData({ isAdmin, overscanStopIndex, num }) {
    const dispatch = useDispatch();
    const studyData = useSelector(studyDataSelector);
    const idByIndex = useCallback(
        (index) => studyData[index]['id'],
        [studyData]
    );

    useEffect(() => {
        if (overscanStopIndex === studyData.length - 2) {
            if (isAdmin) {
                dispatch(
                    fetchStudyAdmin({
                        id: idByIndex(studyData.length - 1),
                        num,
                    })
                );
            } else {
                dispatch(
                    fetchStudy({ id: idByIndex(studyData.length - 1), num })
                );
            }
        }
    }, [studyData, overscanStopIndex, num, isAdmin]);
}

export default useFetchData;
