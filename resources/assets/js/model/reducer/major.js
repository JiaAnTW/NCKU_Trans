import { INIT_MAJOR } from '../action/major';

const initState = {
    data: [],
  };

const majorReducer = (state = initState, action) => {
    switch (action.type) {
      case INIT_MAJOR: {
        return { ...state, data: action.payload.data };
      }
      default:
        return state;
    }
};

export default majorReducer;