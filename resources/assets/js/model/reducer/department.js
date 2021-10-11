import {
    INIT_DEPARTMENT,
    EDIT_DEPARTMENT,
    EDIT_DEPARTMENT_COLLEGE,
    CREATE_DEPARTMENT,
    REMOVE_EDIT_DEPARTMENT,
    DELETE_DEPARTMENT,
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
        case EDIT_DEPARTMENT_COLLEGE: {
            const { collegeNext, collegeOld } = action.payload.value;
            const stateNext = state.map((item) => {
                if (item.college === collegeOld)
                    return { ...item, college: collegeNext };
                return item;
            });
            return stateNext;
        }
        case CREATE_DEPARTMENT: {
            const { id, name, college } = action.payload.value;
            return [...state, { id, name, college }];
        }
        case REMOVE_EDIT_DEPARTMENT: {
            const { id } = action.payload.value;
            const targetIndex = state.findIndex((element) => element.id === id);
            const stateNext = [...state];
            stateNext[targetIndex].name = stateNext[targetIndex].nameNext;
            stateNext[targetIndex].nameNext = undefined;
            return stateNext;
        }
        case DELETE_DEPARTMENT: {
            const { id } = action.payload.value;
            const targetIndex = state.findIndex((element) => element.id === id);
            const stateNext = [...state];
            stateNext.splice(targetIndex, 1);
            return stateNext;
        }
        default:
            return state;
    }
};

export default departmentReducer;
