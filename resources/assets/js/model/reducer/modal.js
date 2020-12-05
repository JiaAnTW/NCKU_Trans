import { OPEN_MODAL, CLOSE_MODAL, SET_MODAL_CONTEXT } from '../action/modal';

const initState = {
    isOpen: false,
    context: {
        id: -1,
        title: '',
        tags: [],
        content: '',
    },
};

const modalReducer = (state = initState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return { ...state, isOpen: true };
        }
        case CLOSE_MODAL: {
            return { ...state, isOpen: false };
        }
        case SET_MODAL_CONTEXT: {
            const { id, title, tags, content } = action.payload.content;
            return { ...state, context: { id, title, tags, content } };
        }
        default:
            return state;
    }
};

export default modalReducer;
