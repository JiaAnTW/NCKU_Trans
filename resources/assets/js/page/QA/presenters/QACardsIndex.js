import React, { useMemo } from 'react';
import QACard from '../component/QACard/index.js';
import useQAFlow from '../utils/useQAFlow';

function QACardsIndex({ itemArr }) {
    useQAFlow({ QAData: itemArr });
    return itemArr.map((item, index) => (
        <QACard itemData={item} key={item['id']} index={index} />
    ));
}

export default QACardsIndex;
