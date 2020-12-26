import React, { useState } from 'react';
import calendar from '../../../img/calendar.png';

import Menu from '../../../components/Filter/FilterPC/Menu';
import MenuItem from '../../../components/Filter/FilterPC/MenuItem';
import Filter from '../../../components/Filter/FilterPC/Filter';

import useClassifyYear from '../utils/useClassifyYear';
import { useSetMajorFilter } from '../../../utils/index';

function YearFilterPresenter() {
    const [selectFilter, setSelectFilter] = useState('none');

    const yearData = useClassifyYear();
    const setFilter = useSetMajorFilter();

    return (
        <div>
            <Filter title={'依年份篩選:'} picture={calendar}>
                <Menu
                    title={'全部年份'}
                    selected={selectFilter === 'none'}
                    onClick={() => {
                        setSelectFilter('none');
                        setFilter('none', 'year');
                    }}
                >
                    {yearData[0].map((year) => (
                        <MenuItem
                            name={year}
                            num={yearData[1][year]}
                            key={year}
                            selected={selectFilter === year}
                            onClick={() => {
                                setSelectFilter(year);
                                setFilter(year, 'year');
                            }}
                        />
                    ))}
                </Menu>
            </Filter>
        </div>
    );
}
export default YearFilterPresenter;
