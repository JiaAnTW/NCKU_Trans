import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toInteger from 'lodash/toInteger';

import { STOP_EDIT_TAG, UPDATE_TAG } from '~/model/action/study';
import {
    deleteStudyTypeOrStat,
    createStudyTypeOrStat,
    updateStudyTypeOrStat,
} from '~/model/middleware/study';

function useFilterTagContext() {
    const dispatch = useDispatch();
    const filterTagContext = useSelector((state) => state.study.admin.tag);

    const deleteTag = useCallback(
        (tag) => {
            dispatch(deleteStudyTypeOrStat(tag));
        },
        [dispatch]
    );

    const cancelEditTag = useCallback(() => {
        dispatch({ type: STOP_EDIT_TAG });
    }, [dispatch]);

    const updateTag = useCallback(
        (tag, action) => {
            if (action === 'create') {
                dispatch(createStudyTypeOrStat(tag));
            } else if (action === 'update') {
                dispatch(updateStudyTypeOrStat(tag));
            }
        },
        [dispatch]
    );

    // tag contains changed part only
    const onChangeTag = useCallback(
        (tag) => {
            if (filterTagContext.dataType === 'int') {
                if (tag.max) tag.max = toInteger(tag.max).toString();
                if (tag.min) tag.min = toInteger(tag.min).toString();
            }
            dispatch({ type: UPDATE_TAG, payload: { tag } });
        },
        [dispatch, filterTagContext.dataType]
    );

    return {
        deleteTag,
        cancelEditTag,
        updateTag,
        onChangeTag,
    };
}

export default useFilterTagContext;
