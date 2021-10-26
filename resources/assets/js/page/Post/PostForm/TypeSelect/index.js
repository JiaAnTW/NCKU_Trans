import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import SchoolIcon from '@material-ui/icons/School';
import ControlArea from '@/components/Form/ControlArea';

import usePostControl from '../usePostControl';

import {
    TypeSelectLayout,
    Title,
    AvatarList,
    AvatarYellow,
    AvatarLayout,
    AvatarText,
} from './style';

const typeList = [
    { type: 'comment', name: '轉/輔/雙主修', icon: ImportContactsIcon },
    //{ type: 'qa', name: '其他學業分享', icon: SchoolIcon },
];

const TypeSelect = forwardRef((props, ref) => {
    const type = useSelector((state) => state.post.type);
    const { onBefore, onNext } = usePostControl('major', 700);

    return (
        <TypeSelectLayout ref={ref}>
            <Title>你想要分享哪類的心得呢?</Title>
            <AvatarList>
                {typeList.map((item) => {
                    const Icon = item.icon;
                    return (
                        <AvatarLayout
                            selected={type === item.type}
                            key={item.type}
                        >
                            <AvatarYellow>
                                <Icon />
                            </AvatarYellow>
                            <AvatarText>{item.name}</AvatarText>
                        </AvatarLayout>
                    );
                })}
            </AvatarList>
            <ControlArea onNext={onNext} onBefore={onBefore} />
        </TypeSelectLayout>
    );
});

export default TypeSelect;
