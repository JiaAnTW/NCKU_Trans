import { START_EDIT_TAG, STOP_EDIT_TAG, UPDATE_TAG } from '../action/study';

const fakeCategory = [
    {
        name: '校內學程',
        value: '校內學程',
    },
    {
        name: '海外交換',
        value: '海外交換',
    },
    {
        name: '跨校修課',
        value: '跨校修課',
    },
];
const fakeStatInfo = [
    {
        name: 'TOFEL',
        value: 'TOFEL',
        dataType: 'integer',
        min: 0,
        max: 120,
    },
    {
        name: 'IELTS',
        value: 'IELTS',
        dataType: 'decimal',
        min: 0,
        max: 9,
    },
    {
        name: 'JLPT',
        value: 'JLPT',
        dataType: 'integer',
        min: 0,
        max: 100,
    },
];

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
    filter: {
        category: fakeCategory,
        statInfo: fakeStatInfo,
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
