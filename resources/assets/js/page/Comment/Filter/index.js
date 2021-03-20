import React from 'react';

import { useWindowWidth } from '../../../utils/index';
import MobileDepartmentFilter from './Mobile/Department';
import MobileYearFilter from './Mobile/Year';
import PCDepartmentFilter from './PC/Department';
import PCYearFilter from './PC/Year';

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
                <MobileDepartmentFilter />
                <MobileYearFilter />
            </div>
        );
    return (
        <>
            <PCYearFilter />
            <PCDepartmentFilter />
        </>
    );
}

export default Filter;
