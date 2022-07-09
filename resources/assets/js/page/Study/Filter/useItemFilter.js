import { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { itemFilterSelector } from '~/model/selector/study';

function useItemFilter() {
    const [categories, setCategories] = useState({});
    const [statInfos, setStatInfos] = useState({});
    const [years, setYears] = useState({});
    const filterOps = useSelector(itemFilterSelector);

    useEffect(() => {
        if (isEmpty(years)) {
            setYears({
                type: 'year',
                name: '涵蓋學年',
                options: filterOps.year,
            });
        }
    }, [years]);

    useEffect(() => {
        setCategories({
            type: 'category',
            name: '心得類別',
            options: filterOps.category,
        });
    }, [filterOps.category]);

    useEffect(() => {
        setStatInfos({
            type: 'statInfo',
            name: '數據資訊',
            options: filterOps.statInfo,
        });
    }, [filterOps.statInfo]);

    return { categories, statInfos, years };
}

export default useItemFilter;
