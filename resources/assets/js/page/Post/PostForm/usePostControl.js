import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postMajorData } from '../../../model/middleware/post';

function usePostControl(editType, formData) {
    const dispatch = useDispatch();

    const handleSubmit = useCallback(() => {
        const params = {
            rank_1: formData.rank_1.value,
            rank_2: formData.rank_2.value,
            year: formData.year.value.toString(),
            score: formData.score.value,
            out_maj: formData.out_maj.value,
            in_maj: formData.in_maj.value,
            comment: formData.comment.value,
        };
        if (editType === 'comment') dispatch(postMajorData(params));
    }, [editType, formData]);

    return { handleSubmit };
}

export default usePostControl;
