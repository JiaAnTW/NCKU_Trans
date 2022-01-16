import React from 'react';
import { useSelector } from 'react-redux';

import Form from '~/components/Form/index';

import TypeSelect from './TypeSelect';
import InputList from './InputList';
import SlideStep from './SlideStep';
import ThankYou from './ThankYou';

import { FormLayout, InputBackground } from './style';

const stepPageArr = [TypeSelect, InputList, ThankYou];

function PostForm() {
    const step = useSelector((state) => state.post.step);
    const mode = useSelector((state) => state.post.mode);
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
