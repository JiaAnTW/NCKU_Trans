import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function fliterSelector(state) {
    return {
        in_maj: state.major.filter.in_maj,
        year: state.major.filter.year,
        department: state.major.filter.department,
        category: state.major.filter.category,
    };
}

function useMajor() {
    const [displayData, setDisplayData] = useState([]);

    const majorData = useSelector((state) => state.major.data);
    const { in_maj, year, department, category } = useSelector(fliterSelector);

    useEffect(() => {
        const data = majorData.filter((item) => {
            return (
                (item['in_maj'] === in_maj || in_maj === 'none') &&
                (item['year'] === Number(year) || year === 'none') &&
                (item['department'] === department || department === 'none') &&
                (item['category'] === category || category === 'none')
            );
        });
        setDisplayData(data);
    }, [majorData, in_maj, year, department, category]);

    return displayData;
}

export default useMajor;
