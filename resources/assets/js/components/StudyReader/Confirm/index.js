import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Toggle from 'react-toggle';
import { updateMajor } from '~/model/middleware/major';
import { useModalOpen } from '~/utils';
import { ConfirmBar, ConfirmText } from './style';

function Confirm({ id, isConfirmed }) {
    const [, setIsModalOpen] = useModalOpen();
    const dispatch = useDispatch();
    const handleChange = useCallback((e) => {
        setIsModalOpen(false);
        dispatch(updateMajor(id, e.target.checked ? 'true' : 'false'));
    }, []);

    return (
        <ConfirmBar isConfirmed={isConfirmed}>
            <Toggle defaultChecked={isConfirmed} onChange={handleChange} />
            <ConfirmText>{isConfirmed ? '已' : '未'}審查通過</ConfirmText>
        </ConfirmBar>
    );
}

export default Confirm;
