import React from 'react';

import { useWindowWidth } from '../../../utils/index';
import MobileDepartmentFilterPresenter from './Mobile/Department';
import MobileYearFilterPresenter from './Mobile/Year';
import DepartmentFilterPresenter from './PC/Department';
import YearFilterPresenter from './PC/Year';

function Filter() {
    const windowWidth = useWindowWidth();
    if (windowWidth < 870)
        return (
            <div
                className="MobileMenu"
                style={{
                    display: 'block',
                }}
            >
                <MobileDepartmentFilterPresenter />
                <MobileYearFilterPresenter />
            </div>
        );
    return (
        <>
            <YearFilterPresenter />
            <DepartmentFilterPresenter />
        </>
    );
}

export default Filter;
