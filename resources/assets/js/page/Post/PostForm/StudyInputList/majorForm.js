import React from 'react';
import map from 'lodash/map';
import { useSelector } from 'react-redux';
import ControlArea from '~/components/Form/ControlArea';
import PostInput from '../Input/PostInput/index';
import usePostControl from '../usePostControl';
import { InputArrLayout, SubForm } from './style';
import { Title } from '../style';
function majorForm({
    index,
    selected,
    previousStep,
    nextStep,
    isFirstPage,
    isLastPage,
    animateType,
}) {
    const type = useSelector((state) => state.post.type);
    const formInputArr = useSelector((state) => ({
        ...state.post.form[type]['p' + index],
    }));
    const { onPreview, onBefore } = usePostControl('major', 700);
    return (
        <SubForm isCurrent={selected} animateType={animateType}>
            <Title>原主修科系</Title>
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
                onNext={isLastPage ? onPreview : nextStep}
                onBefore={isFirstPage ? onBefore : previousStep}
            />
        </SubForm>
    );
}

export default majorForm;
