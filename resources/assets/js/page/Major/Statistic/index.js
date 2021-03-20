import React from 'react';

import { StatisticContainer } from './style';
import LineChart from './LineChart';
import ProgressList from './ProgressList';

function Statistic() {
    return (
        <StatisticContainer>
            <ProgressList />
            <LineChart />
        </StatisticContainer>
    );
}

export default Statistic;
