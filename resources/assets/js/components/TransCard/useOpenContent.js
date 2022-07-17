import { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useModalOpen, useModalContext } from '~/utils/index';
import { changeHeaderInfo } from '~/utils/seo/header';
import trans from '~/utils/transition';
import transIntoModalData from '~/utils/redux/components/modal/transIntoModalData';
import wording from '~/wording/general.json';
import urlMapping from './orientedURL';

export default function useOpenContent(itemData, index) {
    const [, setIsModalOpen] = useModalOpen();
    const [, setModalContext] = useModalContext();
    const history = useHistory();
    const location = useLocation();
    const handleOpenContent = useCallback(() => {
        const strMap = {
            schoolName: wording['schoolName'],
            year: itemData['year'],
            in_maj: itemData['in_maj'],
            category: itemData['category'],
            websiteTitleShort: wording['websiteTitleShort'],
        };
        setModalContext(transIntoModalData('trans', itemData, index));
        changeHeaderInfo(
            trans(wording['header']['title'], strMap),
            itemData['comment']
        );
        history.push(`${urlMapping(location.pathname)}?id=${itemData.id}`);
        setIsModalOpen(true);
    }, [itemData, setIsModalOpen, index, location]);

    return handleOpenContent;
}
