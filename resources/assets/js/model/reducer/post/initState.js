import initStudy from './initStudy';
import initComment from './initComment';

export default {
    step: 0, //1 is index, 2~4 is comment , 5~6 is QA ,7 is loading
    form: {
        study: initStudy,
        comment: initComment,
    },
    type: 'comment',
    start: false,
    onNext: undefined,
    onBefore: undefined,
};
