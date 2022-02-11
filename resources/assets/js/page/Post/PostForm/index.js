import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Form from '~/components/Form/index';
import SlideStep from './SlideStep';
import { typePage } from '~/components/Form/typeList';
import { FormLayout, InputBackground } from './style';

function PostForm() {
    const { step, type } = useSelector((state) => state.post);
    const [stepPageArr, setStepPageArr] = useState(typePage[type]);
    useEffect(() => {
        setStepPageArr(typePage[type]);
    }, [type]);
    return (
        <FormLayout>
            <Form>
                <InputBackground>
                    {stepPageArr.map((StepPageElement, index) => (
                        <SlideStep
                            currentStep={step}
                            step={index * 2}
                            timeout={700}
                            key={index * 2}
                        >
                            <StepPageElement />
                        </SlideStep>
                    ))}
                </InputBackground>
            </Form>
        </FormLayout>
    );
}

export default PostForm;
