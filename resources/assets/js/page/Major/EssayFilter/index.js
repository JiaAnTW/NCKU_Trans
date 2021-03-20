import React from 'react';

import { map } from 'lodash';

import Filter from '@/components/Filter';

import useFilter from './useFilter';
import { EssayContainer } from './style';
import { useSetMajorFilter } from '@/utils/index';

function EssayFilter() {
    const filterObjArr = useFilter();
    const setFilter = useSetMajorFilter();

    return (
        <EssayContainer>
            {map(filterObjArr, ({ type, name, options }, index) => (
                <Filter
                    type={name}
                    key={type ? type : index}
                    options={options}
                    onChange={(value) => setFilter(value, type)}
                />
            ))}
        </EssayContainer>
    );
}

export default EssayFilter;
