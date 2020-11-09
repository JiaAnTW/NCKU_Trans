import { INIT_MAJOR } from '../action/major';

const initState = {
    majorArr: [],
  };

const major = (state = initState, action) => {
    switch (action.type) {
      case INIT_MAJOR: {
        return { ...state, majorArr: action.payload.data };
      }
      default:
        return state;
    }
};

export default major;