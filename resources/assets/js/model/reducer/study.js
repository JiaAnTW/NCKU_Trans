import { INIT_STUDY } from '../action/study';

const initState = {
    data: [],
};

const studyReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_STUDY:
            const initData = action.payload.data.data.map((item) => {
                item.content = item.content.replace(/<br>/g, '\n');
                return item;
            });
            return { ...state, data: initData };
        default:
            return state;
    }
};

export default studyReducer;
