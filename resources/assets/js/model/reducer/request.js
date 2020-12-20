import { ADD_REQUEST, FINISH_REQUEST } from '../action/request';

const initState = 0;

const requestReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_REQUEST: {
            return state + 1;
        }
        case FINISH_REQUEST: {
            return state - 1;
        }
        default:
            return state;
    }
};

export default requestReducer;
