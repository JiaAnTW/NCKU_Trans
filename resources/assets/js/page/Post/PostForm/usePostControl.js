import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { postMajorData } from '~/model/middleware/post';
import { useModalOpen, useModalContext } from '~/utils/index';
import DataMapping from '~/utils/redux/components/modal/dataMapping';
import { SET_POST_ON_NEXT, SET_POST_ON_BEFORE } from '~/model/action/post';
import useSubmit from './useSubmit';
import { postDataList } from './postDataList';

function usePostControl(editType, timeout) {
    const dispatch = useDispatch();
    const type = useSelector((state) => state.post.type);
    const form = useSelector((state) => ({
        ...state.post.form[type],
    }));
    const formData = form.pageMap;
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
        DataMapping.forceTransObjToKeysTable(formData);
        setModalContext(
            DataMapping.transFormData(formData, {
                title: 'in_maj',
                subtitle: 'out_maj',
                type: 'category',
                content: 'comment',
            })
        );
        setIsModalOpen(true);
    }, [formData]);

    // ---------------------
    // -------送出-------
    const onSubmit = useCallback(() => {
        const params = DataMapping.transFormData(
            form,
            postDataList[type],
            form.id,
            form.confirm,
            true
        );
        console.log(params);
        params.year = params.year.toString();
        //if (editType === 'comment') dispatch(postMajorData(params));
    }, [editType, formData]);

    return { onSubmit, onNext, onBefore, onPreview };
}

export default usePostControl;
