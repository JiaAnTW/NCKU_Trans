import React from 'react';
import Input from '~/page/Post/PostForm/InputList/PostInput';
import map from 'lodash/map';

function GroupInput(props) {
    return map(props.children, (child, index) => (
        <Input key={child.wording} elementIndex={index} {...child} />
    ));
}

export default GroupInput;
