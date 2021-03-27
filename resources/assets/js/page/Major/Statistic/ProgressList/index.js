import React from 'react';
import { useAverage, useMin } from './useStatistic';
import useFetchGAS from './useFetchGAS';
import { ProgressListLayout } from './style';
import { useSelector } from 'react-redux';
import Progress from '@/components/Progress/index';

function ProgressList() {
    const { year, department, in_maj } = useSelector(
        (state) => state.major.filter
    );
    const average = useAverage();
    const min = useMin();
    const { passRate, request } = useFetchGAS(
        in_maj === 'none' ? department : in_maj,
        year
    );

    return (
        <ProgressListLayout>
            <Progress name="平均錄取分數" value={average} />
            <Progress name="最低錄取分數" value={min} />
            <Progress
                name="通過率(官方數據)"
                value={passRate * 100}
                isLoading={passRate === undefined || request > 0}
            />
        </ProgressListLayout>
    );
}

export default ProgressList;

/*            <Progress
name="通過率(官方數據)"
value={passRate * 100}
isLoading={passRate === undefined}
/>*/
