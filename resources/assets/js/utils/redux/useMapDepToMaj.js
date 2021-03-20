import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDepartment } from '@/utils/index';

function useMapDepToMaj() {
    const [majData, setMajData] = useState([]);

    const departmentData = useDepartment();
    const collegeSelected = useSelector(
        (state) => state.major.filter.department
    );

    useEffect(() => {
        if (departmentData.length > 0) {
            if (collegeSelected === 'none') {
                setMajData([]);
            } else {
                setMajData(
                    departmentData.filter(
                        (item) => item.college === collegeSelected
                    )
                );
            }
        }
    }, [departmentData, collegeSelected]);

    return { collegeSelected, majData };
}

export default useMapDepToMaj;
