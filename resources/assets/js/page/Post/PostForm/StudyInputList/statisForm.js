import React from 'react';
import map from 'lodash/map';
import { useSelector } from 'react-redux';
import ControlArea from '~/components/Form/ControlArea';
import PostInput from '../Input/PostInput/index';
import PostPairInput from '../Input/PostPairInput/index';
import usePostControl from '../usePostControl';
import { InputArrLayout, SubForm, SelectorLayout } from './style';
import { Title } from '../style';
import SelectorInput from './SelectorInput';
import { Selectors } from './dataSelection';
const calCulateLength = (obj) => {
    return Object.keys(obj).length;
};
const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};
function statisForm({
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
    const comment = useSelector((state) => state.post.form[type].comment);
    const other = useSelector((state) => state.post.form[type].other);
    const { onPreview, onBefore } = usePostControl('major', 700);
    return (
        <SubForm isCurrent={selected} animateType={animateType}>
            <Title>選擇你要分享的統計資料</Title>
            <SelectorLayout>
                {Selectors.map((Selector) => {
                    const nextSelector = deepClone(Selector);
                    return (
                        <SelectorInput {...nextSelector} page={'p' + index} />
                    );
                })}
            </SelectorLayout>
            <InputArrLayout>
                {calCulateLength(formInputArr) === 0 &&
                calCulateLength(other) === 0
                    ? '*目前還沒有選擇任何統計資料'
                    : ''}
                {map(formInputArr, (formInputItem) => {
                    return (
                        typeof formInputItem === 'object' && (
                            <PostInput
                                index={formInputItem.index}
                                key={formInputItem.index}
                                {...formInputItem}
                            />
                        )
                    );
                })}
                <div>
                    {map(other, (item) => {
                        return (
                            <PostPairInput
                                key={item.index}
                                index={item.index}
                                {...item}
                            />
                        );
                    })}
                </div>
                <PostInput {...comment} />
            </InputArrLayout>
            <ControlArea
                onNext={isLastPage ? onPreview : nextStep}
                onBefore={isFirstPage ? onBefore : previousStep}
            />
        </SubForm>
    );
}

export default statisForm;
