import React, { forwardRef, useCallback } from 'react';
import map from 'lodash/map';
import { useSelector } from 'react-redux';
import ControlArea from '~/components/Form/ControlArea';
import PostInput from './PostInput/index';
import usePostControl from '../usePostControl';
import { InputArrLayout } from './style';
import { StepLayout } from '../style';
import { typePage } from '~/components/Form/typeList.js';
import omit from 'lodash/omit';

const PostForm = forwardRef((props, ref) => {
    const step = useSelector((state) => state.post.step);
    const type = useSelector((state) => state.post.type);

    const formInputArr = useSelector((state) =>
        type === 'study'
            ? {
                  ...omit(state.post.form[type].pageMap[step / 2], [
                      'dictionary',
                  ]),
              }
            : { ...state.post.form[type] }
    );
    const { onNext, onPreview, onBefore } = usePostControl('major', 700);
    const handleOnClickNext = useCallback(() => {
        if (step === (typePage[type].length - 2) * 2) {
            onPreview();
        } else {
            onNext();
        }
    });
    const handleOnClickBefore = useCallback(() => {
        onBefore();
    });
    return (
        <StepLayout ref={ref}>
            <InputArrLayout>
                {map(formInputArr, (formInputItem, index) => {
                    return (
                        typeof formInputItem === 'object' && (
                            <PostInput
                                elementIndex={index}
                                key={formInputItem.keyName}
                                {...formInputItem}
                            />
                        )
                    );
                })}
            </InputArrLayout>
            <ControlArea
                onNext={handleOnClickNext}
                onBefore={handleOnClickBefore}
            />
        </StepLayout>
    );
});

export default PostForm;
