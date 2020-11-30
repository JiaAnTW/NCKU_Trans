import { INIT_DEPARTMENT } from '../action/department';

const initState = [];

const departmentReducer = (state = initState, action) => {
    switch (action.type) {
      case INIT_DEPARTMENT: {
        return action.payload.data;
      }
      default:
        return state;
    }
};

export default departmentReducer;