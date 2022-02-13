import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { majorIndexByIdSelector } from '~/model/selector/major';
import { useModalOpen, useModalContext, useSetModalFlow } from '~/utils/index';
import transIntoModalData from '~/utils/redux/components/modal/transIntoModalData';
import { changeHeaderInfo } from '~/utils/seo/header';
import trans from '~/utils/transition';
import wording from '~/wording/general.json';

const handleHeaderChange = (itemData) => {
    changeHeaderInfo(
        trans(wording['header']['title'], {
            schoolName: wording['schoolName'],
            year: itemData['year'],
            in_maj: itemData['in_maj'],
            category: itemData['category'],
            websiteTitleShort: wording['websiteTitleShort'],
        }),
        itemData['comment']
    );
};

function useCommentFlow({ majorData }) {
    const [, setIsModalOpen] = useModalOpen();
    const [{ index }, setModalContent] = useModalContext();
    const [setModalOnBefore, setModalOnNext] = useSetModalFlow();
    const history = useHistory();
    const indexById = useSelector(majorIndexByIdSelector);

    // Open Reader if id is sets by url when user enter the website.
    useEffect(() => {
        if (indexById >= 0) {
            const itemData = majorData[indexById];
            setModalContent(transIntoModalData('trans', itemData, indexById));
            setIsModalOpen(true);
        }
    }, []);

    useEffect(() => {
        if (index !== 0) {
            setModalOnBefore(() => {
                let itemData = majorData[index - 1];
                setModalContent(
                    transIntoModalData('trans', itemData, index - 1)
                );
                handleHeaderChange(itemData);
                history.push(`?id=${itemData['id']}`);
            });
        } else {
            setModalOnBefore(undefined);
        }
    }, [index, majorData, setModalContent, setModalOnBefore]);

    useEffect(() => {
        if (index + 1 !== majorData.length) {
            setModalOnNext(() => {
                let itemData = majorData[index + 1];
                setModalContent(
                    transIntoModalData('trans', itemData, index + 1)
                );
                handleHeaderChange(itemData);
                history.push(`?id=${itemData['id']}`);
            });
        } else {
            setModalOnNext(undefined);
        }
    }, [index, majorData, setModalContent, setModalOnNext]);
}

export default useCommentFlow;
