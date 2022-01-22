import React from 'react';
import PostInput from '../InputList/PostInput';
import { Title, TextGroup } from './style';

function PostPairInput(props) {
    return (
        <>
            <Title>{props.wording}</Title>
            <TextGroup>
                <PostInput {...props.value.keyValue} index={props.index} />
                <PostInput {...props.value.dataValue} index={props.index} />
            </TextGroup>
        </>
    );
}

export default PostPairInput;
