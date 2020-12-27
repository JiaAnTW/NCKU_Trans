import { INIT_QA } from '../action/qa';

const initState = {
    data: [],
};

const QAReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_QA: {
            return { ...state, data: action.payload.data.reverse() };
        }
        default:
            return state;
    }
};

export default QAReducer;
