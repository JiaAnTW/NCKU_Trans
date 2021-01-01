import React from 'react';
import CommentCard from './CommentCard/index';
import useCommentFlow from './useCommentFlow';
import { useMajor } from '../../../utils/index';

function CommentCardsIndex() {
    const majorData = useMajor();
    useCommentFlow({ majorData: majorData });

    return majorData.map((item, index) => (
        <CommentCard itemData={item} key={item['id']} index={index} />
    ));
}
export default CommentCardsIndex;
