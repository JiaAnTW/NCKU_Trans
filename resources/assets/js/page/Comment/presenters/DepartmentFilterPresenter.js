import React, { useState } from 'react';
import Menu from '../../../components/Filter/FilterPC/Menu';
import Filter from '../../../components/Filter/FilterPC/Filter';
import DepartmentFilter from '../component/DepartmentFilter/index';
import book from '../../../img/book.png';
import { useCleanMajorFilter } from '../../../utils/index';

const allDepartment = '全部學系';

function DepartmentFilterPresenter() {
    const [selectFilter, setSelectFilter] = useState(allDepartment);
    const cleanFilter = useCleanMajorFilter();

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
                <Menu
                    title={allDepartment}
                    selected={selectFilter === allDepartment}
                    onClick={() => {
                        setSelectFilter(allDepartment);
                        cleanFilter();
                    }}
                />
                <DepartmentFilter />
            </Filter>
        </div>
    );
}

export default DepartmentFilterPresenter;
