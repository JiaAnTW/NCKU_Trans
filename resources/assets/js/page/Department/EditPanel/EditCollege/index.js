import React, { useContext } from 'react';

import EditList from '~/components/EditList';

import colSelectedContext from '../../context';
import { H4, EditCollegeLayout } from './style';
import useEditCollege from './useEditCollege';

export default function EditCollege() {
    // As we control display college with state which passed by props, stateNext should be sync here
    const { colSelected, setColSelected } = useContext(colSelectedContext);
    const { inputArr, onSubmit, onDelete } = useEditCollege(
        colSelected,
        setColSelected
    );

    return (
        <EditCollegeLayout>
            <H4>目前選擇學院</H4>
            <EditList
                displayName={colSelected.name}
                highlighted={
                    colSelected.nameNext
                        ? colSelected.nameNext !== colSelected.name
                        : false
                }
                inputArr={inputArr}
                onSubmit={onSubmit}
                onDelete={onDelete}
            />
        </EditCollegeLayout>
    );
}
