import React, { useMemo } from 'react';
import CommentCard from '../component/CommentCard/index';
import useCommentFlow from '../utils/useCommentFlow';
import { useMajor } from '../../../utils/index';

function CommentCardsIndex() {
    const majorData = useMajor();
    useCommentFlow({ majorData: majorData });

    return majorData.map((item, index) => (
        <CommentCard itemData={item} key={item['id']} index={index} />
    ));
}
export default CommentCardsIndex;
