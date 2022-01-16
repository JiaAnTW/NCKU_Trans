import initQA from './initQA';
import initComment from './initComment';

export default {
    step: 0, //1 is index, 2~4 is comment , 5~6 is QA ,7 is loading
    form: {
        qa: initQA,
        comment: initComment,
    },
    type: 'comment',
    mode: 0,
    start: false,
    onNext: undefined,
    onBefore: undefined,
};
