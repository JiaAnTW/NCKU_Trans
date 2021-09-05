import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { postMajorData } from '@/model/middleware/post';
import { useModalOpen, useSetModalFlow } from '@/utils/index';

function useSubmit(type, formData) {
    const dispatch = useDispatch();
    const [
        setModalOnBefore,
        setModalOnNext,
        setModalOnConfirm,
    ] = useSetModalFlow();
    const [isModalOpen] = useModalOpen();

    // -------送出-------
    const onMajorSubmit = useCallback(() => {
        const params = {};
        for (let key in formData) {
            const item = formData[key];
            if (typeof item !== 'object') {
                params[key] = item;
                continue;
            }
            if (item.keyName === 'year') {
                params[item.keyName] = item.value.toString();
                continue;
            }
            params[item.keyName] = item.value;
        }
        console.log(params);
        dispatch(postMajorData(params));
    }, [formData]);

    useEffect(() => {
        if (isModalOpen) {
            setModalOnBefore(undefined);
            setModalOnNext(undefined);
            setModalOnConfirm(type === 'comment' ? onMajorSubmit : () => {});
        }
    }, [isModalOpen]);
}

export default useSubmit;
