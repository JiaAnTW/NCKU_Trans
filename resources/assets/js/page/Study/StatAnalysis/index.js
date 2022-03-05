import React from 'react';

import { StatAnalysisContainer } from './style';
import TypeNameColumn from './Column/typeNameColumn';
import DataColumn from './Column/dataColumn';

function StatAnalysis() {
    return (
        <StatAnalysisContainer>
            <TypeNameColumn />
            <DataColumn title="平均數字" />
            <DataColumn title="最小數字" />
        </StatAnalysisContainer>
    );
}

export default StatAnalysis;
