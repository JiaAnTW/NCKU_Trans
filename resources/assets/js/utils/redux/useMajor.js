import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchMajor } from '../../model/middleware/major';

function useMajor() {
    const [displayData, setDisplayData] = useState([]);

    const dispatch = useDispatch();
    const majorData = useSelector((state) => state.major.data);
    const majorFilter = useSelector((state) => state.major.filter);

    useEffect(() => {
        dispatch(fetchMajor());
    }, []);

    useEffect(() => {
        const data = majorData.filter((item) => {
            return (
                (item['in_maj'] === majorFilter['in_maj'] ||
                    majorFilter['in_maj'] === 'none') &&
                (item['year'] === Number(majorFilter['year']) ||
                    majorFilter['year'] === 'none') &&
                (item['department'] === majorFilter['department'] ||
                    majorFilter['department'] === 'none')
            );
        });
        setDisplayData(data);
    }, [majorData, majorFilter]);

    return displayData;
}

export default useMajor;
