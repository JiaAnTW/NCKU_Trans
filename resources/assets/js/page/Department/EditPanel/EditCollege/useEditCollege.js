import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { EDIT_COLLEGE } from '~/model/action/college';
import { updateCollege, deleteCollege } from '~/model/middleware/college';

export default function useEditCollege(colSelected, setColSelected) {
    const dispatch = useDispatch();

    const inputArr = [
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
    ];

    const onSubmit = useCallback(() => {
        if (!colSelected.nameNext) return;
        dispatch(
            updateCollege(
                colSelected.id,
                colSelected.nameNext,
                colSelected.name
            )
        );
        setColSelected({
            id: colSelected.id,
            name: colSelected.nameNext,
        });
    }, [colSelected, setColSelected, dispatch]);

    const onDelete = useCallback(() => {
        dispatch(deleteCollege(colSelected.id));
        setColSelected(undefined);
    }, [colSelected, setColSelected, dispatch]);

    return { inputArr, onSubmit, onDelete };
}
