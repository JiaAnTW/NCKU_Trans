import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { EDIT_DEPARTMENT } from '@/model/action/department';

export default function useEditDep(departmentArr) {
    const dispatch = useDispatch();
    const handleChange = useCallback(
        (e) => {
            dispatch({ type: EDIT_DEPARTMENT, payload: { value: {} } });
        },
        [dispatch]
    );
    return departmentArr.map((item) => ({
        ...item,
        onChange: (e) => {
            dispatch({
                type: EDIT_DEPARTMENT,
                payload: { value: { id: item.id, name: e.target.value } },
            });
        },
    }));
}
