import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchMajor } from '../../model/middleware/major';

const fliterSelector = (state) => ({
    in_maj: state.major.filter.in_maj,
    year: state.major.filter.year,
    department: state.major.filter.department,
});

function useMajor() {
    const [displayData, setDisplayData] = useState([]);

    const majorData = useSelector((state) => state.major.data);
    const { in_maj, year, department } = useSelector(fliterSelector);

    useEffect(() => {
        const data = majorData.filter((item) => {
            return (
                (item['in_maj'] === in_maj || in_maj === 'none') &&
                (item['year'] === Number(year) || year === 'none') &&
                (item['department'] === department || department === 'none')
            );
        });
        setDisplayData(data);
    }, [majorData, in_maj, year, department]);

    return displayData;
}

export default useMajor;
