import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import { postMajorData } from '~/model/middleware/post';
import { useModalOpen, useSetModalFlow } from '~/utils/index';

function useSubmit(type, formData) {
    const dispatch = useDispatch();
    const [setModalOnBefore, setModalOnNext, setModalOnConfirm] =
        useSetModalFlow();
    const [isModalOpen] = useModalOpen();
    const history = useHistory();

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
        dispatch(postMajorData(params));

        if (location.pathname.substr(0, 6) === '/admin') {
            history.push('/admin/major');
        }
    }, [formData]);

    useEffect(() => {
        if (isModalOpen) {
            setModalOnBefore(undefined);
            setModalOnNext(undefined);
            setModalOnConfirm(type === 'major' ? onMajorSubmit : () => {});
        }
    }, [isModalOpen]);
}

export default useSubmit;
