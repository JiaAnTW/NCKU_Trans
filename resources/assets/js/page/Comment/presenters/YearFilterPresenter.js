import React, { useState } from 'react';
import calendar from '../../../img/calendar.png';

import Menu from '../../../components/Filter/FilterPC/Menu';
import MenuItem from '../../../components/Filter/FilterPC/MenuItem';
import Filter from '../../../components/Filter/FilterPC/Filter';

import useClassifyYear from '../utils/useClassifyYear';
import { useCleanMajorFilter, useSetMajorFilter } from '../../../utils/index';

function YearFilterPresenter() {
    const [selectFilter, setSelectFilter] = useState('none');

    const yearData = useClassifyYear();
    const setFilter = useSetMajorFilter();
    const cleanFilter = useCleanMajorFilter();

    const yearMenuItemArr = yearData[0].map((item) => (
        <MenuItem
            name={item}
            num={yearData[1][item]}
            selected={selectFilter === item}
            onClick={() => {
                setSelectFilter(item);
                cleanFilter();
                setFilter(item, 'year');
            }}
        />
    ));

    const yearMenu = (
        <Menu
            title={'全部年份'}
            selected={selectFilter === 'none'}
            onClick={() => {
                setSelectFilter('none');
                cleanFilter();
            }}
        >
            {yearMenuItemArr}
        </Menu>
    );

    return (
        <div>
            <Filter title={'依年份篩選:'} picture={calendar}>
                {yearMenu}
            </Filter>
        </div>
    );
}
export default YearFilterPresenter;
