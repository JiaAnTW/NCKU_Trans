import React, { useMemo } from 'react';
import CommentCard from '../component/CommentCard/index';
import useCommentFlow from '../utils/useCommentFlow';

function CommentCardsIndex({ itemArr }) {
    useCommentFlow({ majorData: itemArr });

    return itemArr.map((item, index) => (
        <CommentCard itemData={item} key={item['id']} index={index} />
    ));
}
export default CommentCardsIndex;
