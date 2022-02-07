import { START_EDIT_TAG, STOP_EDIT_TAG, UPDATE_TAG } from '../action/study';

const initState = {
    data: [],
    admin: {
        isEditTag: false,
        action: undefined,
        tag: {
            type: undefined,
            value: undefined,
            dataType: undefined,
            max: undefined,
            min: undefined,
        },
    },
};

const studyReducer = (state = initState, action) => {
    switch (action.type) {
        case START_EDIT_TAG: {
            const { type, value, dataType, max, min } = action.payload.tag;
            return {
                ...state,
                admin: {
                    isEditTag: true,
                    action: action.payload.action,
                    tag: { type, value, dataType, max, min },
                },
            };
        }
        case STOP_EDIT_TAG: {
            return {
                ...state,
                admin: {
                    isEditTag: false,
                    action: undefined,
                    tag: {
                        type: undefined,
                        value: undefined,
                        dataType: undefined,
                        max: undefined,
                        min: undefined,
                    },
                },
            };
        }
        case UPDATE_TAG: {
            return {
                ...state,
                admin: {
                    ...state.admin,
                    tag: {
                        ...state.admin.tag,
                        ...action.payload.tag,
                    },
                },
            };
        }
        default:
            return state;
    }
};

export default studyReducer;
