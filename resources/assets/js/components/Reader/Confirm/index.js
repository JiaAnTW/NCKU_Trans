import React from 'react';
import { useDispatch } from 'react-redux';
import { useModalOpen } from '~/utils';

import { updateMajor } from '~/model/middleware/major';
import Toggle from 'react-toggle';
import 'react-toggle/style.css'; // for ES6 modules
import { ConfirmLayout, ConfirmText } from './style';

function Confirm({ id, confirm }) {
    const [, setIsModalOpen] = useModalOpen();
    const dispatch = useDispatch();
    return (
        <ConfirmLayout>
            <ConfirmText>是否已審查</ConfirmText>
            <Toggle
                defaultChecked={confirm === 'true'}
                onChange={() => {
                    setIsModalOpen(false);
                    dispatch(
                        updateMajor(id, confirm === 'true' ? 'false' : 'true')
                    );
                }}
            />
        </ConfirmLayout>
    );
}
export default Confirm;
