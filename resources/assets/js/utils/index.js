import useRequest from './redux/useRequest';
import useMapDepToMaj from './redux/useMapDepToMaj';
import useWindowWidth from './useWindowWidth';
import useMedia from './useMedia';
import useSetMajorFilter from './redux/useSetMajorFilter';
import useCleanMajorFilter from './redux/useCleanMajorFilter';

import useModalOpen from './redux/components/modal/useModalOpen';
import useModalContext from './redux/components/modal/useModalContext';
import useSetModalFlow from './redux/components/modal/useSetModalFlow';

export {
    useRequest,
    useModalOpen,
    useModalContext,
    useWindowWidth,
    useMedia,
    useSetMajorFilter,
    useCleanMajorFilter,
    useSetModalFlow,
    useMapDepToMaj,
};
