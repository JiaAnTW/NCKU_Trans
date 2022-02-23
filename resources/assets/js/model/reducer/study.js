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
} from '../action/study';

const fakeData = {
    id: 145,
    category: '轉系',
    rank_1: '16',
    rank_2: '?',
    year: 110,
    score: 86,
    isPass: 'true',
    out_maj: '中文系',
    in_maj: '企管系',
    department: '管理學院',
    comment:
        '我是一進來就抱持著想轉去企管的心情來讀的，但大一上玩太兇⋯成績有點危險（標準是系排1/5，再加上中文系只有60人）因此下學期滿努力在救的！\n然後基本上我上課就是每堂都到，每堂寫筆記，分數幾乎都落在85up\n但還是儘可能往90邁進（靠通識拉分數！）\n如果學弟妹有問題想問可以來找我！\n應該還蠻好找的🤔我的姓很特別（程⋯⋯）',
    confirm: 'true',
};

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
        isEditTag: false,
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
        case START_EDIT_TAG: {
            return {
                ...state,
                admin: {
                    isEditTag: true,
                    action: action.payload.action,
                    tag: { ...action.payload.tag },
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
                        id: undefined,
                        type: undefined,
                        dataType: undefined,
                        max: undefined,
                        min: undefined,
                        selected: false,
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
        case INIT_STUDY_STAT:
            const { type, data } = action.payload;
            let filter = { ...state.filter };
            filter[type] = data;

            return {
                ...state,
                filter,
            };

        case SET_STUDY_FILTER: {
            const { tagType, tagId, checked } = action.payload;

            let tagList = [...state.filter[tagType]];
            const tagIndex = findIndex(tagList, { id: tagId });
            tagList[tagIndex].selected = checked;

            return {
                ...state,
                filter: {
                    ...state.filter,
                    [tagType]: tagList,
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
