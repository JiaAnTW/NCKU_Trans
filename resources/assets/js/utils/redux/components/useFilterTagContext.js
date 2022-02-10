import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toInteger from 'lodash/toInteger';

import { STOP_EDIT_TAG, UPDATE_TAG } from '~/model/action/study';
import {
    deleteItemFilterOption,
    createItemFilterOption,
    updateItemFilterOption,
} from '~/model/middleware/study';

function useFilterTagContext() {
    const dispatch = useDispatch();
    const filterTagContext = useSelector((state) => state.study.admin.tag);

    const deleteTag = useCallback(
        (tag) => {
            dispatch(deleteItemFilterOption(tag));
        },
        [dispatch]
    );

    const cancelEditTag = useCallback(() => {
        dispatch({ type: STOP_EDIT_TAG });
    }, [dispatch]);

    const updateTag = useCallback(
        (tag, action) => {
            if (action === 'create') {
                dispatch(createItemFilterOption(tag));
            } else if (action === 'update') {
                dispatch(updateItemFilterOption(tag));
            }
        },
        [dispatch]
    );

    // tag contains changed part only
    const onChangeTag = useCallback(
        (tag) => {
            if (filterTagContext.dataType === 'integer') {
                if (tag.max) tag.max = toInteger(tag.max).toString();
                if (tag.min) tag.min = toInteger(tag.min).toString();
            }
            dispatch({ type: UPDATE_TAG, payload: { tag } });
        },
        [dispatch, filterTagContext.dataType]
    );

    return {
        filterTagContext,
        deleteTag,
        cancelEditTag,
        updateTag,
        onChangeTag,
    };
}

export default useFilterTagContext;
