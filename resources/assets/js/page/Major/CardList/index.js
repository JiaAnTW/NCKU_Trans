import React from 'react';
import TransCard from '@/components/TransCard';
import useCommentFlow from './useCommentFlow';
import { useMajor } from '@/utils/index';

function CardsList() {
    const majorData = useMajor();
    useCommentFlow({ majorData: majorData });

    return majorData.map((item, index) => (
        <TransCard itemData={item} key={item['id']} index={index} />
    ));
}
export default CardsList;
