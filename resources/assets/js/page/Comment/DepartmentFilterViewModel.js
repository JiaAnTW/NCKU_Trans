import React from 'react';
import Menu from '../../components/Filter/FilterPC/Menu';
import MenuItem from '../../components/Filter/FilterPC/MenuItem';
import Filter from '../../components/Filter/FilterPC/Filter';
import book from '../../img/book.png';
import { useDepartment, useCollege, useMajor } from '../../utils/index';

function DepartmentFilterViewModel() {
    /*const majorData = useMajor();
    const 
    return <Menu>{menuitemArr}</Menu>*/
    // const menuItemArr = majorData.map((item)=>(
    //     <MenuItem name={item.name} num={item.num} selected={item.selected}/>
    // ));
    const departmentData = useDepartment();
    const collegeData = useCollege();

    //classify department
    let classifyDepartmentArr = collegeData.map((item) => ({
        name: item.name,
        id: item.id,
        department: [],
    }));
    departmentData.forEach((element) => {
        classifyDepartmentArr.forEach((item) => {
            if (element.college === item.name)
                item['department'].push(element.name);
        });
    });

    //make them array
    var menuArr = [];
    classifyDepartmentArr.forEach((item) => {
        let output = item.department.map((element) => (
            <MenuItem name={element} num={0} selected={false} />
        ));
        menuArr.push(
            <Menu title={item.name} id={item.id} isSelected={false}>
                {output}
            </Menu>
        );
    });

    return (
        <div className="Menu">
            <Filter picture={book} title={'依學系篩選:'}>
                {menuArr}
            </Filter>
        </div>
    );
}

export default DepartmentFilterViewModel;
