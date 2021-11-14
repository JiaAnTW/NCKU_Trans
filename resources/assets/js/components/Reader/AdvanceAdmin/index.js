import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModalOpen } from '~/utils';

import { deleteMajor } from '~/model/middleware/major';
import EditBtn from './EditBtn.js';
import { AdvanceAdminLayout, Text, BtnDark, BtnLight } from './style';

const START_ADMIN = 'START_ADMIN',
    WAIT_DELETE = 'WAIT_DELETE';

function AdvanceAdmin({ id }) {
    const [step, setStep] = useState(START_ADMIN);
    const [, setIsModalOpen] = useModalOpen();
    const dispatch = useDispatch();
    return (
        <AdvanceAdminLayout>
            {step === START_ADMIN && (
                <>
                    <BtnLight onClick={() => setStep(WAIT_DELETE)}>
                        刪除此心得
                    </BtnLight>
                    <Text></Text>
                    <EditBtn />
                </>
            )}
            {step === WAIT_DELETE && (
                <>
                    <BtnLight
                        onClick={() => {
                            setIsModalOpen(false);
                            dispatch(deleteMajor(id));
                        }}
                    >
                        確認刪除
                    </BtnLight>
                    <Text>真的要刪除這個心得嗎?</Text>

                    <BtnDark onClick={() => setStep(START_ADMIN)}>取消</BtnDark>
                </>
            )}
        </AdvanceAdminLayout>
    );
}
export default AdvanceAdmin;
