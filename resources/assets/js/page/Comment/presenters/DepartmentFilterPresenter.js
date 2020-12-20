import React, { useState } from 'react';
import Menu from '../../../components/Filter/FilterPC/Menu';
import MenuItem from '../../../components/Filter/FilterPC/MenuItem';
import Filter from '../../../components/Filter/FilterPC/Filter';
import book from '../../../img/book.png';
import useClassifyDepartment from '../utils/useClassifyDepartment';
import { useCleanMajorFilter, useSetMajorFilter } from '../../../utils/index';

function DepartmentFilterPresenter() {
    const allDepartment = '全部學系';
    const [selectFilter, setSelectFilter] = useState(allDepartment);

    const classifyDepartmentArr = useClassifyDepartment();
    const setFilter = useSetMajorFilter();
    const cleanFilter = useCleanMajorFilter();

    const allDepartmentMenu = (
        <Menu
            title={allDepartment}
            selected={selectFilter === allDepartment}
            onClick={() => {
                setSelectFilter(allDepartment);
                cleanFilter();
            }}
        />
    );

    //make them array
    var menuArr = classifyDepartmentArr.map((item) => {
        let output = item.department.map((element) => {
            return (
                <MenuItem
                    name={element.name}
                    num={element.num}
                    selected={selectFilter === element.name}
                    onClick={() => {
                        setSelectFilter(element.name);
                        cleanFilter();
                        setFilter(element.name, 'in_maj');
                    }}
                />
            );
        });
        return (
            <Menu
                title={item.name}
                id={item.id}
                selected={selectFilter === item.name}
                onClick={() => {
                    setSelectFilter(item.name);
                    cleanFilter();
                    setFilter(item.name, 'department');
                }}
            >
                {output}
            </Menu>
        );
    });

    return (
        <div
            className="Menu"
            style={{
                position: 'relative',
                marginTop: '30px',
                width: '100%',
            }}
        >
            <Filter picture={book} title={'依學系篩選:'}>
                {allDepartmentMenu}
                {menuArr}
            </Filter>
        </div>
    );
}

export default DepartmentFilterPresenter;
