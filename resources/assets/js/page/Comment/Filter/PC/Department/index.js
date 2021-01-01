import React from 'react';
import { useSelector } from 'react-redux';
import Menu from '../../../../../components/Filter/FilterPC/Menu';
import Filter from '../../../../../components/Filter/FilterPC/Filter';
import DepartmentFilter from './DepartmentFilter/index';
import book from '../../../../../img/book.png';
import { useCleanMajorFilter } from '../../../../../utils/index';

function DepartmentFilterPresenter() {
    const department = useSelector((state) => state.major.filter.department);
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
                    title="全部學系"
                    selected={department === 'none'}
                    onClick={cleanFilter}
                />
                <DepartmentFilter />
            </Filter>
        </div>
    );
}

export default DepartmentFilterPresenter;
