import { initComment } from './initComment';
import { initStudy } from './initStudy';

export default {
    initPost: {
        step: 0, //1 is index, 2~4 is comment , 5~6 is QA ,7 is loading
        form: {
            comment: initComment,
            study: initStudy,
        },
        type: 'comment',
        start: false,
        onNext: undefined,
        onBefore: undefined,
    },
    initComment: initComment,
    initStudy: initStudy,
};
