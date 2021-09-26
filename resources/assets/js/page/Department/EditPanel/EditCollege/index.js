import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { EDIT_COLLEGE } from '@/model/action/college';
import { updateCollege } from '@/model/middleware/college';
import EditList from '@/components/EditList';

import colSelectedContext from '../../context';

export default function EditCollege({ college: { id, name } }) {
    const dispatch = useDispatch();
    // As we control display college with state which passed by props, stateNext should be sync here
    const { colSelected, setColSelected } = useContext(colSelectedContext);

    return (
        <div>
            <EditList
                displayName={name}
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
                                        id: id,
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
            />
        </div>
    );
}
