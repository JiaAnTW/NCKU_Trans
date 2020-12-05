import { INIT_COLLEGE } from '../action/college';

const initState = [];

const collegeReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_COLLEGE: {
            return action.payload.data;
        }
        default:
            return state;
    }
};

export default collegeReducer;
