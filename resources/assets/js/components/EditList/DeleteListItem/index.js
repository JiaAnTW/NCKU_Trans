import React, { useState, useEffect } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { useModalOpen } from '@/utils';
import ConfirmModal from '@/components/Modal/ConfirmModal';

import { DeleteButton, ConfirmLayout, TargetSpan } from './style';

export default function DeleteListItem({ targetName, onDelete }) {
    const [, setIsModalOpen] = useModalOpen();
    return (
        <>
            <DeleteButton
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                <DeleteForeverIcon />
            </DeleteButton>
            <ConfirmModal
                title={'請確認要刪除的項目'}
                onConfirm={() => {
                    setIsModalOpen(false);
                    onDelete();
                }}
            >
                <ConfirmLayout>
                    確定要刪除
                    <TargetSpan>{` ${targetName} `}</TargetSpan> 資料嗎?
                </ConfirmLayout>
            </ConfirmModal>
        </>
    );
}
