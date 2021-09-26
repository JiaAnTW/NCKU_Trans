import React from 'react';

import { EditPanelLayout } from './style';
import useDepFilter from './useDepFilter';
import EditCollege from './EditCollege';
import DepartmentList from './DepartmentList';

export default function EditPanel({ college }) {
    const depData = useDepFilter(college && college.name);
    return (
        <EditPanelLayout>
            {college && (
                <>
                    <EditCollege college={college} />
                    <DepartmentList value={depData} />
                </>
            )}
        </EditPanelLayout>
    );
}
