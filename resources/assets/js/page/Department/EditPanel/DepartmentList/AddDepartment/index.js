import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { useModalOpen } from '@/utils';
import { createDepartment } from '@/model/middleware/department';
import EditList from '@/components/EditList';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import colSelectedContext from '../../../context';

import { ConfirmLayout, CollegeSpan } from '../../style';

export default function AddDepartment({ college }) {
    const [name, setName] = useState('');
    const [, setIsModalOpen] = useModalOpen();
    const dispatch = useDispatch();
    const { colSelected } = useContext(colSelectedContext);

    return (
        <>
            <EditList
                displayName="+ 新增學系"
                highlighted={name !== ''}
                inputArr={[
                    {
                        id: '0',
                        value: name,
                        wording: '新的學系名稱',
                        onChange: (e) => setName(e.target.value),
                    },
                ]}
                onSubmit={() => {
                    if (name === '') return;
                    setIsModalOpen(true);
                }}
            />
            <ConfirmModal
                title={'請確認新增的項目'}
                onConfirm={() => {
                    setIsModalOpen(false);
                    dispatch(
                        createDepartment(
                            { name, college: colSelected.name },
                            () => setName('')
                        )
                    );
                }}
            >
                <ConfirmLayout>
                    在 <strong>{colSelected.name}</strong>新增學系:
                    <CollegeSpan>{` ${name}`}</CollegeSpan>
                </ConfirmLayout>
            </ConfirmModal>
        </>
    );
}
