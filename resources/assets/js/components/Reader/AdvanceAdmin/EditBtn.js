import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { OVERWRITE_POST } from '~/model/action/post';
import { useModalContext } from '~/utils';
import { useModalOpen } from '~/utils';
import { BtnDark } from './style';

export default function EditBtn() {
    const [{ rawData }] = useModalContext();
    const history = useHistory();
    const [, setIsModalOpen] = useModalOpen();
    const dispatch = useDispatch();

    const handleEdit = useCallback(() => {
        dispatch({
            type: OVERWRITE_POST,
            payload: { data: rawData, type: 'comment' },
        });
        setIsModalOpen(false);
        history.push('/admin/post');
    }, [rawData, history, setIsModalOpen]);

    return <BtnDark onClick={handleEdit}>編輯</BtnDark>;
}
