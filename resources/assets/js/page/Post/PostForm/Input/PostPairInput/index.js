import React from 'react';
import PostInput from '../PostInput';

import { Title, TextGroup, RemarkSpan } from './style';
function PostPairInput(props) {
    return (
        <>
            <Title>{props.wording}</Title>
            <TextGroup>
                <PostInput {...props.keyValue} index={props.index} />
                <PostInput {...props.value} index={props.index} />
                {props.remark && <RemarkSpan>{`*${props.remark}`}</RemarkSpan>}
            </TextGroup>
        </>
    );
}

export default PostPairInput;
