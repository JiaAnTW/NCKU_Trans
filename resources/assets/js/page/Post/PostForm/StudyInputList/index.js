import React, { forwardRef, useCallback, useState } from 'react';
import { StepLayout } from '../style';
import MajorForm from './majorForm';
import StatisForm from './statisForm';

const subFormArr = [MajorForm, StatisForm];
const PostForm = forwardRef((props, ref) => {
    const [stepNow, setStepNow] = useState(0);
    const [animateType, setAnimateType] = useState(0); //-1 to left 0 none change 1 to right
    const toPreviousPage = useCallback(() => {
        setAnimateType(-1);
        setStepNow(stepNow - 1);
    }, [setStepNow, stepNow]);
    const toNextPage = useCallback(() => {
        setAnimateType(1);
        setStepNow(stepNow + 1);
    }, [setStepNow, stepNow]);
    return (
        <StepLayout ref={ref}>
            {subFormArr.map((SubForm, index) => {
                return (
                    <SubForm
                        index={index}
                        animateType={animateType}
                        selected={index === stepNow}
                        previousStep={toPreviousPage}
                        nextStep={toNextPage}
                        isFirstPage={index === 0}
                        isLastPage={index === subFormArr.length - 1}
                    />
                );
            })}
            <MajorForm />
        </StepLayout>
    );
});

export default PostForm;
