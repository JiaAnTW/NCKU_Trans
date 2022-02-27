import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { useModalOpen, useSetModalFlow } from '~/utils/index';
import DataMapping from '~/utils/redux/components/modal/dataMapping';
import omit from 'lodash/omit';
import map from 'lodash/map';
import { postDataList } from './postDataList';
import { postMajorData, postStudyData } from '~/model/middleware/post';

function useSubmit(editType, form) {
    const dispatch = useDispatch();
    const [setModalOnBefore, setModalOnNext, setModalOnConfirm] =
        useSetModalFlow();
    const [isModalOpen] = useModalOpen();
    const history = useHistory();
    const type = useSelector((state) => state.post.type);
    // -------送出-------
    const onMajorSubmit = useCallback(() => {
        if (type == 'comment') {
            const params = DataMapping.transFormData(
                form,
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
        if (location.pathname.substr(0, 6) === '/admin') {
            history.push('/admin/major');
        }
    }, [form]);

    useEffect(() => {
        if (isModalOpen) {
            setModalOnBefore(undefined);
            setModalOnNext(undefined);
            setModalOnConfirm(editType === 'major' ? onMajorSubmit : () => {});
        }
    }, [isModalOpen]);
}

export default useSubmit;
