import { StyledSchoolIcon, StyledImportContactsIcon } from './style';
import TypeSelect from '~/page/Post/PostForm/TypeSelect';
import StudyInputList from '~/page/Post/PostForm/StudyInputList';
import CommentInputList from '~/page/Post/PostForm/CommentInputList';
import ThankYou from '~/page/Post/PostForm/ThankYou';

export const typePage = {
    study: [TypeSelect, StudyInputList, ThankYou],
    comment: [TypeSelect, CommentInputList, ThankYou],
};
export const typeList = [
    {
        type: 'study',
        name: '交換學生、學程、跨校選課......任何學業相關的心得都能在這裡分享',
        buttonText: '一般學業心得',
        icon: StyledSchoolIcon,
    },
    {
        type: 'comment',
        name: '分享申請轉系、輔系、雙主修的過程，以及申請通過後，生活轉變的點點滴滴',
        buttonText: '轉輔雙主心得',
        icon: StyledImportContactsIcon,
    },
];
