import React, { useState } from 'react';
import useClassifyDepartment from '../../utils/useClassifyDepartment';
import Menu from '../../../../components/Filter/FilterPC/Menu';
import MenuItem from '../../../../components/Filter/FilterPC/MenuItem';
import {
    useCleanMajorFilter,
    useSetMajorFilter,
} from '../../../../utils/index';

function DepartmentFilter() {
    const [selectFilter, setSelectFilter] = useState('全部學系');
    const classifyDepartmentArr = useClassifyDepartment();
    const setFilter = useSetMajorFilter();
    const cleanFilter = useCleanMajorFilter();

    return classifyDepartmentArr.map((college) => {
        return (
            <Menu
                title={college.name}
                id={college.id}
                key={college.id}
                selected={selectFilter === college.name}
                onClick={() => {
                    setSelectFilter(college.name);
                    cleanFilter();
                    setFilter(college.name, 'department');
                }}
            >
                {college.department.map((department) => {
                    return (
                        <MenuItem
                            name={department.name}
                            num={department.num}
                            key={department.name}
                            selected={selectFilter === department.name}
                            onClick={() => {
                                setSelectFilter(department.name);
                                cleanFilter();
                                setFilter(department.name, 'in_maj');
                            }}
                        />
                    );
                })}
            </Menu>
        );
    });
}

export default DepartmentFilter;
