import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { updateDepartment } from '@/model/middleware/department';
import EditList from '@/components/EditList';

import useEditDep from './useEditDep';
import colSelectedContext from '../../context';

export default function DepartmentList({ value }) {
    const departmentArr = useEditDep(value);
    const dispatch = useDispatch();
    const { colSelected } = useContext(colSelectedContext);

    return (
        <div>
            {departmentArr.map(({ id, name, nameNext, onChange }) => {
                return (
                    <EditList
                        key={id}
                        displayName={name}
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
                                updateDepartment(id, nameNext, colSelected.name)
                            );
                        }}
                    />
                );
            })}
        </div>
    );
}
