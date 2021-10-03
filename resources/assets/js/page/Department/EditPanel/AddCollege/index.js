import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Input from '@/components/atom/Input';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { useModalOpen } from '@/utils';
import { createCollege } from '@/model/middleware/college';

import { AddCollegeLayout, SubmitLayout, SubmitButton } from './style';

import { ConfirmLayout, CollegeSpan } from '../style';

export default function AddCollege() {
    const [name, setName] = useState('');
    const [, setIsModalOpen] = useModalOpen();
    const dispatch = useDispatch();

    return (
        <AddCollegeLayout>
            <Input
                value={name}
                wording={'新的學院名稱'}
                onChange={(e) => setName(e.target.value)}
            />
            <SubmitLayout>
                <SubmitButton onClick={() => setIsModalOpen(true)}>
                    確定新增
                </SubmitButton>
            </SubmitLayout>
            <ConfirmModal
                title={'請確認新增的項目'}
                onConfirm={() => {
                    setIsModalOpen(false);
                    dispatch(createCollege({ name }, () => setName('')));
                }}
            >
                <ConfirmLayout>
                    新增學院:
                    <CollegeSpan>{` ${name}`}</CollegeSpan>
                </ConfirmLayout>
            </ConfirmModal>
        </AddCollegeLayout>
    );
}
