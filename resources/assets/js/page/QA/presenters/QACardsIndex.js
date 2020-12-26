import React from 'react';
import QACard from '../component/QACard/index.js';
import useQAFlow from '../utils/useQAFlow';
import { useQA } from '../../../utils/index';

function QACardsIndex() {
    const QAData = useQA();
    useQAFlow({ QAData });
    return QAData.map((item, index) => (
        <QACard itemData={item} key={item['id']} index={index} />
    ));
}

export default QACardsIndex;
