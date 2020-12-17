import { INIT_MAJOR, SET_FILTER, CLEAN_FILTER } from '../action/major';

const initState = {
    data: [],
    filter: {
        year: 'none',
        in_maj: 'none',
        department: 'none',
    },
};

const majorReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_MAJOR: {
            return { ...state, data: action.payload.data };
        }
        case SET_FILTER: {
            let filter = state.filter;
            filter[action.payload.type] = action.payload.value;
            return { ...state, filter };
        }
        case CLEAN_FILTER: {
            return {
                ...state,
                filter: {
                    year: 'none',
                    in_maj: 'none',
                    department: 'none',
                },
            };
        }
        default:
            return state;
    }
};

export default majorReducer;
