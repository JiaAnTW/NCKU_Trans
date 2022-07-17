import React, { forwardRef } from 'react';
import map from 'lodash/map';
import ControlArea from '~/components/Form/ControlArea';
import PostInput from './PostInput/index';
import { InputArrLayout } from './style';
import { StepLayout } from '../style';
import useDisplayElement from './useDisplayElement';

const PostForm = forwardRef((props, ref) => {
    const { formInputArr, handleOnClickNext, handleOnClickBefore } =
        useDisplayElement();
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
