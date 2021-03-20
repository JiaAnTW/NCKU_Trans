import { useState, useEffect, useMemo } from 'react';
import { isEqual, isEmpty } from 'lodash';
import { useMapDepToMaj, useCollege } from '@/utils/index';

const date = new Date();

const category = {
    type: 'category',
    name: '類別',
    options: [
        {
            name: '轉系',
            value: 'trans',
        },
        {
            name: '輔修',
            value: 'sub',
        },
        {
            name: '雙主修',
            value: 'double',
        },
    ],
};

const getYearArr = () => {
    let arr = [{ name: '全部年份', value: 'none' }];
    const currentYear = date.getFullYear();
    for (let i = currentYear; i >= 2015; i--) {
        if (i === currentYear && date.getMonth() < 7) {
            continue;
        }
        arr.push({ name: i - 1911, value: i - 1911 });
    }
    return arr;
};

const yearArr = getYearArr();

function useFilter() {
    const [year, setYear] = useState({});
    const [department, setDepartment] = useState({});
    const [in_maj, setIn_maj] = useState({});

    useEffect(() => {
        if (isEmpty(year)) {
            setYear({
                type: 'year',
                name: '年份',
                options: yearArr,
            });
        }
    }, [year]);

    // department------------------------------
    const collegeData = useCollege();

    useEffect(() => {
        if (isEmpty(department)) {
            let collegeArr = [
                {
                    name: '全部學院',
                    value: 'none',
                },
            ];

            collegeData.forEach((item) => {
                collegeArr.push({
                    name: item.name,
                    value: item.name,
                });
            });

            setDepartment({
                type: 'department', // 技術債
                name: '學院',
                options: collegeArr,
            });
        }
    }, [department]);

    const { collegeSelected, majData } = useMapDepToMaj();
    useEffect(() => {
        if (collegeSelected === 'none') {
            setIn_maj({
                type: 'in_maj', // 技術債
                name: '學系',
                options: [],
            });
        } else {
            let majArr = [
                {
                    name: '全部學系',
                    value: 'none',
                },
            ];

            majData.forEach((item) => {
                majArr.push({
                    name: item.name,
                    value: item.name,
                });
            });
            setIn_maj({
                type: 'in_maj', // 技術債
                name: '學系',
                options: majArr,
            });
        }
    }, [collegeSelected, majData]);

    return { year, category, department, in_maj };
}

export default useFilter;
