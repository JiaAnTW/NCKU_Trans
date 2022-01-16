import React, { forwardRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { typeList } from '~/components/Form/typeList';
import ControlArea from '~/components/Form/ControlArea';
import TypeController from '~/components/Form/TypeController';
import usePostControl from '../usePostControl';

import {
    TypeSelectLayout,
    Title,
    AvatarList,
    AvatarLayout,
    AvatarText,
} from './style';

const TypeSelect = forwardRef((props, ref) => {
    const type = useSelector((state) => state.post.type);
    const { onBefore, onNext } = usePostControl('major', 700);
    return (
        <TypeSelectLayout ref={ref}>
            <Title>你想要分享哪類的心得呢?</Title>
            <AvatarList>
                {typeList.map((item) => {
                    const Icon = item.icon;
                    console.log(item.type);
                    return (
                        <AvatarLayout
                            selected={type === item.type}
                            key={item.name}
                        >
                            <Icon />
                            <AvatarText>{item.name}</AvatarText>
                        </AvatarLayout>
                    );
                })}
            </AvatarList>
            <TypeController />
            <ControlArea onNext={onNext} onBefore={onBefore} />
        </TypeSelectLayout>
    );
});

export default TypeSelect;
