import React from 'react';
import { useSelector } from 'react-redux';

import Form from '@/components/Form/index';
import TypeSelect from './TypeSelect';
import InputList from './InputList';
import SlideStep from './SlideStep';

import { FormLayout, InputBackground } from './style';

function PostForm() {
    const step = useSelector((state) => state.post.step);

    return (
        <FormLayout>
            <Form>
                <InputBackground>
                    <SlideStep currentStep={step} step={0} timeout={700}>
                        <TypeSelect />
                    </SlideStep>
                    <SlideStep currentStep={step} step={2} timeout={700}>
                        <InputList />
                    </SlideStep>
                </InputBackground>
            </Form>
        </FormLayout>
    );
}

export default PostForm;
