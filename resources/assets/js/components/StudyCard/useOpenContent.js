import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useModalOpen, useModalContext } from '~/utils/index';
import { changeHeaderInfo } from '~/utils/seo/header';
import trans from '~/utils/transition';
import transIntoModalData from '~/utils/redux/components/modal/transIntoModalData';
import wording from '~/wording/general.json';

export default function useOpenContent(itemData, index) {
    const [, setIsModalOpen] = useModalOpen();
    const [, setModalContext] = useModalContext();
    const history = useHistory();

    const handleOpenContent = useCallback(() => {
        setModalContext(transIntoModalData('study', itemData, index));
        const strMap = {
            schoolName: wording['schoolName'],
            title: itemData['title'],
            websiteTitleShort: wording['websiteTitleShort'],
        };
        changeHeaderInfo(
            trans(wording['header']['studyTitle'], strMap),
            itemData['content']
        );

        history.push(`?id=${itemData.id}`);
        setIsModalOpen(true);
    }, [itemData, setIsModalOpen, index]);

    return handleOpenContent;
}
