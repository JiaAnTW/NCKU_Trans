import {
    INIT_DEPARTMENT,
    EDIT_DEPARTMENT,
    REMOVE_EDIT_DEPARTMENT,
} from '../action/department';

const initState = [];

const departmentReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_DEPARTMENT: {
            return action.payload.data;
        }
        case EDIT_DEPARTMENT: {
            const { id, name } = action.payload.value;
            const targetIndex = state.findIndex((element) => element.id === id);
            const stateNext = [...state];
            stateNext[targetIndex].nameNext = name;
            return stateNext;
        }
        case REMOVE_EDIT_DEPARTMENT:
            const { id } = action.payload.value;
            const targetIndex = state.findIndex((element) => element.id === id);
            const stateNext = [...state];
            stateNext[targetIndex].name = stateNext[targetIndex].nameNext;
            stateNext[targetIndex].nameNext = undefined;
            return stateNext;
        default:
            return state;
    }
};

export default departmentReducer;
