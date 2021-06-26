import { INIT_MAJOR, SET_FILTER, CLEAN_FILTER } from '../action/major';

const initState = {
    data: [],
    filter: {
        year: 'none',
        in_maj: 'none',
        department: 'none',
        category: 'none',
    },
};

const majorReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_MAJOR: {
            return { ...state, data: action.payload.data.reverse() };
        }
        case SET_FILTER: {
            let filter = state.filter;
            filter[action.payload.type] = action.payload.value;
            if (
                action.payload.type === 'department' &&
                filter['in_maj'] !== 'none'
            )
                filter['in_maj'] = 'none';
            return { ...state, filter };
        }
        case CLEAN_FILTER: {
            return {
                ...state,
                filter: {
                    year: state.filter.year,
                    in_maj: 'none',
                    department: 'none',
                    category: state.filter.category,
                },
            };
        }
        default:
            return state;
    }
};

export default majorReducer;
