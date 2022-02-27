import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { useModalOpen, useModalContext } from '~/utils/index';
import DataMapping from '~/utils/redux/components/modal/dataMapping';
import { SET_POST_ON_NEXT, SET_POST_ON_BEFORE } from '~/model/action/post';
import useSubmit from './useSubmit';
import useSubmitTransData from './useSubmitTransData';
import { previewDataList } from './postDataList';

function usePostControl(editType, timeout) {
    const dispatch = useDispatch();
    const type = useSelector((state) => state.post.type);
    const form = useSelector((state) => ({
        ...state.post.form[type],
    }));
    useSubmit(editType, form);

    // ---------------------
    // -------切換階段-------
    const onNext = useCallback(() => {
        dispatch({ type: SET_POST_ON_NEXT });
        setTimeout(() => dispatch({ type: SET_POST_ON_NEXT }), timeout);
    }, [dispatch]);

    const history = useHistory();
    const location = useLocation();

    const onBefore = useCallback(() => {
        if (location.pathname.substr(0, 6) === '/admin') {
            history.push(`/admin/${editType}`);
            return;
        }
        dispatch({ type: SET_POST_ON_BEFORE });
        setTimeout(() => dispatch({ type: SET_POST_ON_BEFORE }), timeout);
    }, [location, history, dispatch]);

    // ---------------------
    // -------預覽-------
    const [, setIsModalOpen] = useModalOpen();
    const [, setModalContext] = useModalContext();

    const onPreview = useCallback(() => {
        DataMapping.forceTransObjToKeysTable(form);
        let transedData;
        if (type === 'study') {
            transedData = DataMapping.transFormData(
                form,
                previewDataList[type],
                'name'
            );
            transedData.statistic = transedData.tags;
            transedData.postTime = DataMapping.dateSpawner;
        } else {
            transedData = DataMapping.transFormData(
                form,
                previewDataList[type]
            );
        }
        setModalContext(transedData);
        setIsModalOpen(true);
    }, [form]);

    // ---------------------
    // -------送出-------
    const postData = useSubmitTransData(form, type);
    const onSubmit = useCallback(() => {
        postData();
    }, [postData]);

    return { onSubmit, onNext, onBefore, onPreview };
}

export default usePostControl;
