import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { useModalOpen, useSetModalFlow } from '~/utils/index';
import useSubmitTransData from './useSubmitTransData';

function useSubmit(editType, form) {
    const [setModalOnBefore, setModalOnNext, setModalOnConfirm] =
        useSetModalFlow();
    const [isModalOpen] = useModalOpen();
    const history = useHistory();
    const type = useSelector((state) => state.post.type);
    // -------送出-------
    const handleSubmit = useSubmitTransData(form, type);
    const onMajorSubmit = useCallback(() => {
        handleSubmit();
        if (location.pathname.substr(0, 6) === '/admin') {
            history.push('/admin/major');
        }
    }, [handleSubmit]);

    useEffect(() => {
        if (isModalOpen) {
            setModalOnBefore(undefined);
            setModalOnNext(undefined);
            setModalOnConfirm(editType === 'major' ? onMajorSubmit : () => {});
        }
    }, [isModalOpen]);
}

export default useSubmit;
