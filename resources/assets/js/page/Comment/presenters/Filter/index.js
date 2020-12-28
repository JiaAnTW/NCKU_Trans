import React from 'react';

import { useWindowWidth } from '../../../../utils/index';
import MobileDepartmentFilterPresenter from '../MobileDepartmentFilterPresenter';
import MobileYearFilterPresenter from '../MobileYearFilterPresenter';
import DepartmentFilterPresenter from '../DepartmentFilterPresenter';
import YearFilterPresenter from '../YearFilterPresenter';

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
