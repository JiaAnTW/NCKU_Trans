import React, { forwardRef, useCallback } from 'react';
import map from 'lodash/map';
import { useDispatch, useSelector } from 'react-redux';
import ControlArea from '~/components/Form/ControlArea';
import PostInput from './PostInput/index';
import usePostControl from '../usePostControl';
import { InputArrLayout } from './style';
import { StepLayout, Title } from '../style';
import { typePage } from '~/components/Form/typeList.js';
import {
    SET_SUBPAGE_ON_NEXT,
    SET_SUBPAGE_ON_BEFORE,
} from '~/model/action/post';

const PostForm = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const step = useSelector((state) => state.post.step);
    const type = useSelector((state) => state.post.type);
    const form = useSelector((state) => state.post.form[type]);
    const subStep = form.step;
    const pickInputObj = useCallback(
        (keyArr) => {
            const tempObj = {};
            map(keyArr, (key) => {
                tempObj[key] = form[key];
            });
            return tempObj;
        },
        [form]
    );
    const formInputArr = useSelector((state) =>
        type === 'study'
            ? pickInputObj({ ...state.post.form[type][subStep] })
            : { ...state.post.form[type] }
    );
    const { onNext, onPreview, onBefore } = usePostControl('major', 700);
    const handleOnClickNext = useCallback(() => {
        if (step === (typePage[type].length - 2) * 2) {
            onPreview();
        } else {
            onNext();
            setTimeout(() => dispatch({ type: SET_SUBPAGE_ON_NEXT }), 700);
        }
    });
    const handleOnClickBefore = useCallback(() => {
        onBefore();
        setTimeout(() => dispatch({ type: SET_SUBPAGE_ON_BEFORE }), 700);
    });
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
            <ControlArea
                onNext={handleOnClickNext}
                onBefore={handleOnClickBefore}
            />
        </StepLayout>
    );
});

export default PostForm;
