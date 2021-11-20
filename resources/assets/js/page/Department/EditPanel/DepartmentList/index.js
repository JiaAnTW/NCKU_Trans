import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import {
    updateDepartment,
    deleteDepartment,
} from '~/model/middleware/department';
import EditList from '~/components/EditList';

import useEditDep from './useEditDep';
import colSelectedContext from '../../context';
import AddDepartment from './AddDepartment';
import { DepartmentListLayout, Hr } from './style';

export default function DepartmentList({ value }) {
    const departmentArr = useEditDep(value);
    const dispatch = useDispatch();
    const { colSelected } = useContext(colSelectedContext);

    return (
        <DepartmentListLayout>
            {departmentArr.map(({ id, name, nameNext, onChange }) => {
                return (
                    <React.Fragment key={id}>
                        <EditList
                            displayName={name}
                            highlighted={nameNext ? nameNext !== name : false}
                            inputArr={[
                                {
                                    id: '0',
                                    value: nameNext ? nameNext : name,
                                    wording: '名稱',
                                    onChange: onChange,
                                },
                            ]}
                            onSubmit={() => {
                                if (!nameNext) return;
                                dispatch(
                                    updateDepartment(
                                        id,
                                        nameNext,
                                        colSelected.name
                                    )
                                );
                            }}
                            onDelete={() => dispatch(deleteDepartment(id))}
                        />
                        <Hr />
                    </React.Fragment>
                );
            })}
            <AddDepartment />
        </DepartmentListLayout>
    );
}
