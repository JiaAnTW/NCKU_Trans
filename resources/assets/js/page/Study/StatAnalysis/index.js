import React from 'react';

import { StatAnalysisContainer } from './style';
import TypeNameColumn from './Column/typeNameColumn';
import DataColumn from './Column/dataColumn';
import { useSelector } from 'react-redux';
import { selectedStatFilterSelector } from '../../../model/selector/study';

function StatAnalysis() {
    const statFilters = useSelector(selectedStatFilterSelector);

    return (
        <StatAnalysisContainer
            isShow={statFilters !== null && statFilters.length > 0}
        >
            <TypeNameColumn
                dataArray={statFilters.map((filter) => filter.name)}
            />
            <DataColumn title="平均數字" />
            <DataColumn title="最小數字" />
        </StatAnalysisContainer>
    );
}

export default StatAnalysis;
