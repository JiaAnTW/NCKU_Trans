import React from 'react';
import { useSelector } from 'react-redux';

function useClassifyYear() {
    const majorData = useSelector((state) => state.major.data);

    const countYear = () => {
        let count = {};
        let valueArr = [];
        majorData.forEach((item) => {
            if (!count[item.year]) count[item.year] = 1;
            else count[item.year]++;
        });
        for (let key in count) {
            valueArr.push(key);
        }
        return [valueArr.reverse(), count];
    };

    return countYear();
}

export default useClassifyYear;
