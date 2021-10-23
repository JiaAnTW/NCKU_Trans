import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { isShowSelector, msgSelector } from '@/model/selector/announcement';
import useSetAnnIsShow from '@/utils/redux/useSetAnnIsShow';

import { YellowSnackbar, BtnClose, WarningIconWhite } from './style';

export default function Notification() {
    const [uuid, setUUID] = useState(Date.now());
    const isShow = useSelector(isShowSelector);
    const msg = useSelector(msgSelector);

    const setAnnIsShow = useSetAnnIsShow();

    const handleClose = useCallback(
        (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            setAnnIsShow(false);
        },
        [setAnnIsShow]
    );

    return (
        <YellowSnackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={isShow}
            onClose={handleClose}
            message={msg}
            key={uuid}
            action={
                <BtnClose theme="light" onClick={handleClose}>
                    我知道了
                </BtnClose>
            }
        />
    );
}
