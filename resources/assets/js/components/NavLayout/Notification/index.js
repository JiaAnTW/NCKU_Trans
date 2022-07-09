import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { isShowedSelector, msgSelector } from '~/model/selector/announcement';
import useSetAnnIsShowed from '~/utils/redux/useSetAnnIsShowed';

import useInitNotification from './useInitNotification';
import { YellowSnackbar, BtnClose } from './style';

export default function Notification() {
    const [uuid, setUUID] = useState(Date.now());
    const isShowed = useSelector(isShowedSelector);
    const msg = useSelector(msgSelector);

    useInitNotification();
    const setAnnIsShowed = useSetAnnIsShowed();

    const handleClose = useCallback(
        (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            setAnnIsShowed(false);
        },
        [setAnnIsShowed]
    );

    return (
        <>
            {isShowed && (
                <YellowSnackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={isShowed}
                    onClose={handleClose}
                    message={msg}
                    key={uuid}
                    action={
                        <BtnClose theme="light" onClick={handleClose}>
                            我知道了
                        </BtnClose>
                    }
                />
            )}
        </>
    );
}
