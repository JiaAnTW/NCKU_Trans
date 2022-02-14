import React, { forwardRef, useCallback } from 'react';
import map from 'lodash/map';
import { useSelector } from 'react-redux';
import ControlArea from '~/components/Form/ControlArea';
import PostInput from './PostInput/index';
import usePostControl from '../usePostControl';
import { InputArrLayout } from './style';
import { StepLayout } from '../style';
import { typePage } from '~/components/Form/typeList.js';
import useDisplayStep from './useDisplayStep';

const PostForm = forwardRef((props, ref) => {
    const step = useSelector((state) => state.post.step);
    const type = useSelector((state) => state.post.type);
    const lastStep = useDisplayStep(step);
    const formInputArr = useSelector((state) => {
        return { ...state.post.form[type].pageMap[lastStep / 2] };
    });
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
                    const elementArea = index;
                    return map(formInputItem, (block, index) => {
                        return (
                            typeof block === 'object' && (
                                <PostInput
                                    elementArea={elementArea}
                                    elementIndex={index}
                                    key={block.keyName}
                                    {...block}
                                />
                            )
                        );
                    });
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
