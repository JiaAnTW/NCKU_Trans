import React, { forwardRef } from 'react';
import map from 'lodash/map';
import { useSelector } from 'react-redux';

import ControlArea from '~/components/Form/ControlArea';
import PostInput from './PostInput/index';

import usePostControl from '../usePostControl';

import { InputArrLayout } from './style';
import { StepLayout, Title } from '../style';

const PostForm = forwardRef((props, ref) => {
    const type = useSelector((state) => state.post.type);
    const formInputArr = useSelector((state) => ({ ...state.post.form[type] }));
    const { onPreview, onBefore } = usePostControl('major', 700);

    return (
        <StepLayout ref={ref}>
            <Title>留下更多資訊給學弟妹吧!</Title>
            <InputArrLayout>
                {map(formInputArr, (formInputItem) => {
                    return (
                        typeof formInputItem === 'object' && (
                            <PostInput
                                key={formInputItem.keyName}
                                {...formInputItem}
                            />
                        )
                    );
                })}
            </InputArrLayout>
            <ControlArea onNext={onPreview} onBefore={onBefore} />
        </StepLayout>
    );
});

export default PostForm;
