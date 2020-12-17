import React from 'react';
import Menu from '../../components/Filter/FilterPC/Menu';
import MenuItem from '../../components/Filter/FilterPC/MenuItem';
import Filter from '../../components/Filter/FilterPC/Filter';
import book from '../../img/book.png';
import useClassifyDepartment from './useClassifyDepartment';
import useSetMajorFilter from '../../utils/redux/useSetMajorFilter';
import {useMajor} from '../../utils/index'

function DepartmentFilterViewModel() {
    
    let classifyDepartmentArr = useClassifyDepartment();
    
    const majorData = useMajor();
    const majorFilter = useSetMajorFilter();
    

    //make them array
    var menuArr = classifyDepartmentArr.map((item) => {
        let output = item.department.map((element) => {
                return (
                    <MenuItem name={element.name} num={element.num} selected={false} onClick={()=>majorFilter(element.name,'in_major')} />
                );
            });
        return(
            <Menu title={item.name} id={item.id} isSelected={false} onClick={()=>majorFilter(item.name,'department')} > 
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
