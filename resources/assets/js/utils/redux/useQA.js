import { useSelector } from 'react-redux';

import { fetchQA } from '../../model/middleware/qa';

function useQA() {
    const QAData = useSelector((state) => state.QA.data);
    return QAData;
}

export default useQA;
