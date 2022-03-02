import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_FILTER_OPEN, SET_FILTER_MANAGE } from '~/model/action/study';

function useFilterStatusContext() {
    const dispatch = useDispatch();
    const filterStatusContext = useSelector(
        (state) => state.study.filter.status
    );

    const openFilter = useCallback(() => {
        dispatch({ type: SET_FILTER_OPEN, payload: { isOpen: true } });
    }, [dispatch]);

    const closeFilter = useCallback(() => {
        dispatch({ type: SET_FILTER_OPEN, payload: { isOpen: false } });
    }, [dispatch]);

    const startManageFilter = useCallback(() => {
        dispatch({ type: SET_FILTER_MANAGE, payload: { isManage: true } });
    }, [dispatch]);

    const endManageFilter = useCallback(() => {
        dispatch({ type: SET_FILTER_MANAGE, payload: { isManage: false } });
    }, [dispatch]);

    return {
        filterStatusContext,
        openFilter,
        closeFilter,
        startManageFilter,
        endManageFilter,
    };
}
export default useFilterStatusContext;
