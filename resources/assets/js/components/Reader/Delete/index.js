import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModalOpen } from '@/utils';

import { deleteMajor } from '@/model/middleware/major';
import {
    DeleteLayout,
    DeleteText,
    DeleteBtnDark,
    DeleteBtnLight,
} from './style';

const START_DELETE = 'START_DELETE',
    WAIT_DELETE = 'WAIT_DELETE',
    SEND_DELETE = 'SEND_DELETE';

function Delete({ id }) {
    const [step, setStep] = useState(START_DELETE);
    const [, setIsModalOpen] = useModalOpen();
    const dispatch = useDispatch();
    return (
        <DeleteLayout>
            {step === START_DELETE && (
                <DeleteBtnDark onClick={() => setStep(WAIT_DELETE)}>
                    刪除此心得
                </DeleteBtnDark>
            )}
            {step === WAIT_DELETE && (
                <>
                    <DeleteBtnLight
                        onClick={() => {
                            setIsModalOpen(false);
                            dispatch(deleteMajor(id));
                        }}
                    >
                        確認刪除
                    </DeleteBtnLight>
                    <DeleteText>真的要刪除這個心得嗎?</DeleteText>

                    <DeleteBtnDark onClick={() => setStep(START_DELETE)}>
                        取消
                        <br />
                        我不要刪除
                    </DeleteBtnDark>
                </>
            )}
        </DeleteLayout>
    );
}
export default Delete;
