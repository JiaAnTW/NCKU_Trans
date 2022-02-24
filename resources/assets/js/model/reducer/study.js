import findIndex from 'lodash/findIndex';
import {
    ADD_STUDY_STAT,
    CLEAR_STUDY_FILTER,
    DELETE_STUDY_STAT,
    INIT_STUDY,
    INIT_STUDY_STAT,
    SET_STUDY_FILTER,
    START_EDIT_TAG,
    STOP_EDIT_TAG,
    UPDATE_STUDY_STAT,
    UPDATE_TAG,
    SET_FILTER_OPEN,
    SET_FILTER_MANAGE,
} from '../action/study';

const date = new Date();
const getYearArr = () => {
    const currentYear = date.getFullYear();
    let arr = [];
    for (let i = currentYear; i > currentYear - 5; i--) {
        let year = (i - 1911).toString();
        arr.push({ id: year, name: year + '年', value: year });
    }
    return arr.slice(0, 4);
};
const yearArr = getYearArr();

const initState = {
    data: [],
    admin: {
        action: undefined,
        tag: {
            id: undefined,
            type: undefined,
            dataType: undefined,
            max: undefined,
            min: undefined,
            selected: false,
        },
    },
    filter: {
        category: [],
        statInfo: [],
        year: yearArr,
        status: {
            isOpen: false,
            isManage: false,
            isEditTag: false,
        },
    },
};

const studyReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_STUDY: {
            // const initData = action.payload.data.data.map((item) : {
            //     item.content = item.content.replace(/<br>/g, '\n');
            //     return item;
            // });
            const initData = [
                {
                    id: 1,
                    title: '心得1',
                    content: 'test',
                    timestamp: 36400,
                    category: [
                        { id: 3, name: '出國交換' },
                        { id: 2, name: 'QA' },
                    ],
                    statistic: [
                        { id: 1, name: 'TOEFL', value: 110 },
                        { id: 4, name: 'GPA4.3', value: 4.2 },
                    ],
                    confirm: true,
                },
                {
                    id: 2,
                    title: '心得2',
                    content: 'test',
                    timestamp: 36400,
                    category: [
                        { id: 4, name: '實習' },
                        { id: 2, name: 'QA' },
                    ],
                    statistic: [
                        { id: 3, name: 'TOEIC', value: 700 },
                        { id: 4, name: 'GPA4.3', value: 3.7 },
                    ],
                    confirm: false,
                },
                {
                    id: 3,
                    title: '心得3',
                    content: 'test',
                    timestamp: 36400,
                    category: [{ id: 3, name: '出國交換' }],
                    statistic: [
                        { id: 3, name: 'IELTS', value: 5.5 },
                        { id: 4, name: 'GPA4.3', value: 3.5 },
                    ],
                    confirm: true,
                },
                {
                    id: 4,
                    title: '心得4',
                    content: 'test',
                    timestamp: 36400,
                    category: [{ id: 3, name: '出國交換' }],
                    statistic: [
                        { id: 3, name: 'TOEIC', value: 730 },
                        { id: 4, name: 'GPA4.3', value: 3.8 },
                    ],
                    confirm: false,
                },
                {
                    id: 5,
                    title: '心得5',
                    content: 'test',
                    timestamp: 36400,
                    category: [{ id: 4, name: '實習' }],
                    statistic: [
                        { id: 3, name: 'TOEIC', value: 500 },
                        { id: 4, name: 'GPA4.3', value: 3.0 },
                    ],
                    confirm: false,
                },
            ];
            return { ...state, data: initData };
        }
        case SET_FILTER_OPEN: {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    status: {
                        ...state.filter.status,
                        isOpen: action.payload.isOpen,
                    },
                },
            };
        }
        case SET_FILTER_MANAGE: {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    status: {
                        ...state.filter.status,
                        isManage: action.payload.isManage,
                    },
                },
            };
        }
        case START_EDIT_TAG: {
            return {
                ...state,
                admin: {
                    action: action.payload.action,
                    tag: { ...action.payload.tag },
                },
                filter: {
                    ...state.filter,
                    status: {
                        ...state.filter.status,
                        isEditTag: true,
                    },
                },
            };
        }
        case STOP_EDIT_TAG: {
            return {
                ...state,
                admin: {
                    action: undefined,
                    tag: {
                        id: undefined,
                        type: undefined,
                        dataType: undefined,
                        max: undefined,
                        min: undefined,
                        selected: false,
                    },
                },
                filter: {
                    ...state.filter,
                    status: {
                        ...state.filter.status,
                        isEditTag: false,
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
        case INIT_STUDY_STAT: {
            const { type, data } = action.payload;
            let filter = { ...state.filter };
            filter[type] = data;

            return {
                ...state,
                filter,
            };
        }
        case SET_STUDY_FILTER: {
            const { tagType, tagId, checked } = action.payload;

            let tags = [...state.filter[tagType]];
            const tagIndex = findIndex(tags, { id: tagId });
            tags[tagIndex].selected = checked;

            return {
                ...state,
                filter: {
                    ...state.filter,
                    [tagType]: tags,
                },
            };
        }
        case CLEAR_STUDY_FILTER: {
            let filter = { ...state.filter };

            Object.values(filter).forEach((tagList) => {
                for (let tag of tagList) {
                    tag.selected = false;
                }
            });
            return { ...state, filter };
        }
        case ADD_STUDY_STAT: {
            let { type, tag } = action.payload;
            let tagList = [...state.filter[type]];
            tagList.push(tag);

            return {
                ...state,
                filter: {
                    ...state.filter,
                    [type]: tagList,
                },
            };
        }
        case UPDATE_STUDY_STAT: {
            const { type, tag } = action.payload;

            let tagList = [...state.filter[type]];
            const tagIndex = findIndex(tagList, { id: tag.id });
            tagList[tagIndex] = { ...tag };

            return {
                ...state,
                filter: {
                    ...state.filter,
                    [type]: tagList,
                },
            };
        }
        case DELETE_STUDY_STAT: {
            const { type, tagId } = action.payload;

            let tagList = [...state.filter[type]];
            const tagIndex = findIndex(tagList, { id: tagId });
            tagList.splice(tagIndex, 1);

            return {
                ...state,
                filter: {
                    ...state.filter,
                    [type]: tagList,
                },
            };
        }
        default:
            return state;
    }
};

export default studyReducer;
