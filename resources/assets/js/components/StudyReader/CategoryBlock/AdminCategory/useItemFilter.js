import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { itemFilterSelector } from '~/model/selector/study';

function useItemFilter() {
    const [categories, setCategories] = useState({});
    const filterOps = useSelector(itemFilterSelector);

    useEffect(() => {
        setCategories({
            type: 'category',
            name: '心得類別',
            options: filterOps.category,
        });
    }, [filterOps.category]);

    return { categories };
}

export default useItemFilter;
