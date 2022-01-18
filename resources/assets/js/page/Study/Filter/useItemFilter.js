import { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';

const date = new Date();

const categories = {
    type: 'category',
    name: '心得類別',
    options: [
        {
            name: '校內學程',
            value: '校內學程',
        },
        {
            name: '海外交換',
            value: '海外交換',
        },
        {
            name: '跨校修課',
            value: '跨校修課',
        },
    ],
};

const statInfos = {
    type: 'statInfo',
    name: '數據資訊',
    options: [
        {
            name: 'TOFEL',
            value: 'TOFEL',
        },
        {
            name: 'IELTS',
            value: 'IELTS',
        },
        {
            name: 'JLPT',
            value: 'JLPT',
        },
    ],
};

const getYearArr = () => {
    const currentYear = date.getFullYear();
    let arr = [];
    for (let i = currentYear; i > currentYear - 5; i--) {
        if (i === currentYear && date.getMonth() < 7) {
            continue;
        }
        arr.push({ name: (i - 1911).toString() + '年', value: i - 1911 });
    }
    return arr.slice(0, 4);
};
const yearArr = getYearArr();

function useItemFilter() {
    const [years, setYears] = useState({});

    useEffect(() => {
        if (isEmpty(years)) {
            setYears({
                type: 'year',
                name: '涵蓋學年',
                options: yearArr,
            });
        }
    }, [years]);

    return { categories, statInfos, years };
}

export default useItemFilter;
