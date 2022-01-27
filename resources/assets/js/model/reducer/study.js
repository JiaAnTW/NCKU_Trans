import { START_EDIT_TAG, CANCEL_EDIT_TAG } from '../action/study';

const initState = {
    data: [],
    admin: {
        isEditTag: false,
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
                    tag: { type, value, dataType, max, min },
                },
            };
        }
        case CANCEL_EDIT_TAG: {
            return {
                ...state,
                admin: {
                    isEditTag: false,
                    tag: {},
                },
            };
        }
        default:
            return state;
    }
};

export default studyReducer;
