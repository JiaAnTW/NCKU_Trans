import React from 'react';
import { useSelector } from 'react-redux';
import TransCard from '@/components/TransCard';
import useCommentFlow from './useCommentFlow';
import { majorDisplaySelector } from '@/model/selector/major';

function CardsList() {
    const majorData = useSelector(majorDisplaySelector);
    useCommentFlow({ majorData: majorData });

    return majorData.map((item, index) => (
        <TransCard itemData={item} key={item['id']} index={index} />
    ));
}
export default CardsList;
