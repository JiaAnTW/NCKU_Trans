import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import { postMajorData } from '~/model/middleware/post';
import { useModalOpen, useSetModalFlow } from '~/utils/index';
import { postDataList } from './postDataList';
import transFormData from '~/utils/redux/components/modal/transFormData';

function useSubmit(editType, form) {
    const formData = form.pageMap;
    const dispatch = useDispatch();
    const [setModalOnBefore, setModalOnNext, setModalOnConfirm] =
        useSetModalFlow();
    const [isModalOpen] = useModalOpen();
    const history = useHistory();
    const type = useSelector((state) => state.post.type);

    // -------送出-------
    const onMajorSubmit = useCallback(() => {
        const params = transFormData(
            formData,
            postDataList[type],
            form.id,
            form.confirm,
            true
        );
        params.year = params.year.toString();
        dispatch(postMajorData(params));

        if (location.pathname.substr(0, 6) === '/admin') {
            history.push('/admin/major');
        }
    }, [formData]);

    useEffect(() => {
        if (isModalOpen) {
            setModalOnBefore(undefined);
            setModalOnNext(undefined);
            setModalOnConfirm(editType === 'major' ? onMajorSubmit : () => {});
        }
    }, [isModalOpen]);
}

export default useSubmit;
