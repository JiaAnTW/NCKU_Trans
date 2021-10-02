import React, { useState } from 'react';

import Input from '@/components/atom/Input';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { useModalOpen } from '@/utils';

import {
    AddCollegeLayout,
    SubmitLayout,
    SubmitButton,
    ConfirmLayout,
    CollegeSpan,
} from './style';

export default function AddCollege() {
    const [name, setName] = useState('');
    const [, setIsModalOpen] = useModalOpen();

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
            <ConfirmModal title={'請確認新增的項目'}>
                <ConfirmLayout>
                    新增學院:
                    <CollegeSpan>{` ${name}`}</CollegeSpan>
                </ConfirmLayout>
            </ConfirmModal>
        </AddCollegeLayout>
    );
}
