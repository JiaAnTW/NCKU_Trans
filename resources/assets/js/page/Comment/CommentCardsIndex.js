import React, { useMemo } from 'react';
import CommentCard from './CommentCard';

function CommentCardsIndex({ itemArr }) {
    return useMemo(
        () =>
            itemArr.map((item) => (
                <CommentCard itemData={item} key={item['id']} />
            )),
        [itemArr]
    );
}
export default CommentCardsIndex;
