import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { postMajorData, postStudyData } from '~/model/middleware/post';
import { useModalOpen, useModalContext } from '~/utils/index';
import DataMapping from '~/utils/redux/components/modal/dataMapping';
import { SET_POST_ON_NEXT, SET_POST_ON_BEFORE } from '~/model/action/post';
import useSubmit from './useSubmit';
import omit from 'lodash/omit';
import map from 'lodash/map';
import { postDataList, previewDataList } from './postDataList';

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
        let transedData;
        if (type === 'study') {
            transedData = DataMapping.transFormData(
                formData,
                previewDataList[type],
                'name'
            );
            transedData.statistic = transedData.tags;
            transedData.postTime = DataMapping.dateSpawner;
        } else {
            transedData = DataMapping.transFormData(
                formData,
                previewDataList[type]
            );
        }
        setModalContext(transedData);
        setIsModalOpen(true);
    }, [formData]);

    // ---------------------
    // -------送出-------
    const onSubmit = useCallback(() => {
        if (type == 'comment') {
            const params = DataMapping.transFormData(
                formData,
                postDataList[type],
                undefined,
                form.id,
                form.confirm,
                true
            );
            params.year = params.year.toString();
            dispatch(postMajorData(params));
        } else {
            const { keysTable } = DataMapping.forceTransObjToKeysTable(form);
            let pickData = {};
            for (let key in keysTable) {
                pickData[key] = key;
            }

            let paramPackage = DataMapping.transFormData(
                form,
                pickData,
                undefined,
                form.id,
                form.confirm,
                true
            );
            let params = {};

            const settingKeys = postDataList[type].settingKeys;
            map(settingKeys, (key) => {
                params[key] = paramPackage[key];
            });
            pickData = omit(pickData, settingKeys);

            params.category = {}; //init
            const category = postDataList[type].category;
            map(category, (key) => {
                params.category[key] = paramPackage[key];
            });
            pickData = omit(pickData, category);

            const tags = [];
            map(pickData, (pack) => {
                tags.push({
                    name: pack,
                    value: paramPackage[pack],
                });
            });
            params.statistic = tags;
            paramPackage = omit(
                paramPackage,
                Object.keys(pickData).concat(settingKeys)
            );
            params = { ...params, ...paramPackage };
            dispatch(postStudyData(params));
        }
    }, [editType, formData]);

    return { onSubmit, onNext, onBefore, onPreview };
}

export default usePostControl;
