import { OPEN_MODAL, CLOSE_MODAL, SET_MODAL_CONTEXT, SET_MODAL_BEFORE, SET_MODAL_NEXT } from '../action/modal';

const initState = {
    isOpen: false,
    context: {
        id: -1,
        title: '',
        tags: [],
        content: '',
    },
    onBefore: undefined,
    onNext: undefined,
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
        case SET_MODAL_BEFORE: {
            const onBefore = action.payload.onBefore;
            return { ...state, onBefore};
        }
        case SET_MODAL_NEXT: {
            const onNext = action.payload.onNext;
            return { ...state, onNext};
        }
        default:
            return state;
    }
};

export default modalReducer;
