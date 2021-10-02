import React from 'react';

import { EditPanelLayout } from './style';
import useDepFilter from './useDepFilter';
import EditCollege from './EditCollege';
import DepartmentList from './DepartmentList';
import AddCollege from './AddCollege';

export default function EditPanel({ college }) {
    const depData = useDepFilter(college && college.name);
    return (
        <EditPanelLayout>
            {college &&
                (college.id !== -1 ? (
                    <>
                        <EditCollege college={college} />
                        <DepartmentList value={depData} />
                    </>
                ) : (
                    <AddCollege />
                ))}
        </EditPanelLayout>
    );
}
