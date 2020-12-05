import React, { useMemo } from 'react';
import QACard from './QACard';

function QACardsIndex({ itemArr }) {
    return useMemo(
        () =>
            itemArr.map((item) => <QACard itemData={item} key={item['id']} />),
        [itemArr]
    );
}

export default QACardsIndex;
