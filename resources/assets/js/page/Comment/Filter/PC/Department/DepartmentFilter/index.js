import React from 'react';
import { useSelector } from 'react-redux';
import useClassifyDepartment from '../usePCDepartment';
import Menu from '../../../../../../components/Filter/FilterPC/Menu';
import MenuItem from '../../../../../../components/Filter/FilterPC/MenuItem';
import {
    useCleanMajorFilter,
    useSetMajorFilter,
} from '../../../../../../utils/index';

function DepartmentFilter() {
    const [department, in_maj] = useSelector((state) => [
        state.major.filter.department,
        state.major.filter.in_maj,
    ]);
    const classifyDepartmentArr = useClassifyDepartment();
    const setFilter = useSetMajorFilter();

    return classifyDepartmentArr.map((collegItem) => {
        return (
            <Menu
                title={collegItem.name}
                id={collegItem.id}
                key={collegItem.id}
                selected={department === collegItem.name}
                onClick={() => {
                    setFilter('none', 'in_maj');
                    setFilter(collegItem.name, 'department');
                }}
            >
                {collegItem.department.map((departmentItem) => {
                    return (
                        <MenuItem
                            name={departmentItem.name}
                            num={departmentItem.num}
                            key={departmentItem.name}
                            selected={in_maj === departmentItem.name}
                            onClick={() => {
                                setFilter(departmentItem.name, 'in_maj');
                            }}
                        />
                    );
                })}
            </Menu>
        );
    });
}

export default DepartmentFilter;
