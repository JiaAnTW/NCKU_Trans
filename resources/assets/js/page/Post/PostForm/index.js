import React from 'react';
import { useSelector } from 'react-redux';

import Form from '../../../components/Form/index';
import PostInput from './PostInput/index';

import useInitOptions from './useInitOptions';

function PostForm() {
    const type = useSelector((state) => state.post.type);
    const formInputArr = useSelector((state) => ({ ...state.post.form[type] }));
    const isFinishRequest = useInitOptions();

    return (
        <Form>
            {isFinishRequest &&
                Object.keys(formInputArr).map((formInputName) => {
                    const item = formInputArr[formInputName];
                    return (
                        formInputName !== 'id' && (
                            <PostInput key={item.keyName} {...item} />
                        )
                    );
                })}
        </Form>
    );
}

export default PostForm;
