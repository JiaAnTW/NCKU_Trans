import React, { useState } from 'react';
import { Button, ButtonContainer } from './style';
import { color } from '~/theme/global';
import ConfirmModal from '~/components/Modal/ConfirmModal';
import { useDispatch } from 'react-redux';
import { deleteStudy } from '~/model/middleware/study';
import { useHistory } from 'react-router';
import { useModalOpen } from '~/utils';

function AdminAdvance({ id }) {
    const [onDelete, setOnDelete] = useState(false);
    const [, setModalOpen] = useModalOpen();
    const dispatch = useDispatch();
    const history = useHistory();
    const handleDelete = () => {
        setOnDelete(true);
    };
    const handleEdit = () => {
        setModalOpen(false);
        history.push({
            pathname: '/post',
            state: { id },
        });
    };
    const handleConfirm = () => {
        dispatch(deleteStudy(id));
    };
    return (
        <ButtonContainer>
            <Button
                height="32px"
                width="110px"
                bgc={color.white}
                onClick={handleDelete}
            >
                刪除此心得
            </Button>
            <Button
                height="32px"
                width="110px"
                bgc={color.yellow}
                onClick={handleEdit}
            >
                編輯
            </Button>
            {onDelete && (
                <ConfirmModal
                    title="確定要刪除此筆資料？"
                    onConfirm={handleConfirm}
                />
            )}
        </ButtonContainer>
    );
}

export default AdminAdvance;
