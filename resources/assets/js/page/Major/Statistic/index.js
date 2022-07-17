import React from 'react';

import StatisticControl from '~/components/StatisticControl';

import { StatisticContainer } from './style';
import LineChart from './LineChart';
import ProgressList from './ProgressList';

function Statistic() {
    return (
        <StatisticControl>
            <StatisticContainer>
                <ProgressList />
                <LineChart />
            </StatisticContainer>
        </StatisticControl>
    );
}

export default Statistic;
