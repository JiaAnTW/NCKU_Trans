import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { EDIT_COLLEGE } from '@/model/action/college';
import { updateCollege, deleteCollege } from '@/model/middleware/college';
import EditList from '@/components/EditList';

import colSelectedContext from '../../context';
import { H4, EditCollegeLayout } from './style';

export default function EditCollege() {
    const dispatch = useDispatch();
    // As we control display college with state which passed by props, stateNext should be sync here
    const { colSelected, setColSelected } = useContext(colSelectedContext);

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
                inputArr={[
                    {
                        id: '0',
                        value: colSelected.nameNext
                            ? colSelected.nameNext
                            : colSelected.name,
                        wording: '名稱',
                        onChange: (e) => {
                            dispatch({
                                type: EDIT_COLLEGE,
                                payload: {
                                    value: {
                                        id: colSelected.id,
                                        name: e.target.value,
                                    },
                                },
                            });
                            setColSelected({
                                ...colSelected,
                                nameNext: e.target.value,
                            });
                        },
                    },
                ]}
                onSubmit={() => {
                    if (!colSelected.nameNext) return;
                    dispatch(updateCollege(id, colSelected.nameNext));
                    setColSelected({
                        id: colSelected.id,
                        name: colSelected.nameNext,
                    });
                }}
                onDelete={() => {
                    dispatch(deleteCollege(colSelected.id));
                    setColSelected(undefined);
                }}
            />
        </EditCollegeLayout>
    );
}
