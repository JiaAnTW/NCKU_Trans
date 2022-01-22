import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { changeHeaderInfo } from '~/utils/seo/header';
import trans from '~/utils/transition';
import wording from '~/wording/general';

export default function useCloseReader() {
    const history = useHistory();
    const { pathname } = useLocation();

    const handleCloseReader = useCallback(() => {
        changeHeaderInfo(
            trans(wording['websiteTitle'], {
                websiteTitleShort: wording['websiteTitleShort'],
                schoolName: wording['schoolName'],
            }),
            wording['description']
        );
        history.replace({ pathname });
    }, [history, pathname]);

    return { handleCloseReader };
}
