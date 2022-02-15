import findIndex from 'lodash/findIndex';
import {
    ADD_STUDY_STAT,
    CLEAR_STUDY_FILTER,
    DELETE_STUDY_STAT,
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

const fakeCategory = [
    {
        id: 'cat1',
        name: '校內學程',
        value: '校內學程',
        selected: false,
    },
    {
        id: 'cat2',
        name: '海外交換',
        value: '海外交換',
        selected: false,
    },
    {
        id: 'cat3',
        name: '跨校修課',
        value: '跨校修課',
        selected: false,
    },
];

const fakeStatInfo = [
    {
        id: 'stat1',
        name: 'TOFEL',
        value: 'TOFEL',
        dataType: 'integer',
        min: 0,
        max: 120,
        selected: false,
    },
    {
        id: 'stat2',
        name: 'IELTS',
        value: 'IELTS',
        dataType: 'decimal',
        min: 0,
        max: 9,
        selected: false,
    },
    {
        id: 'stat3',
        name: 'JLPT',
        value: 'JLPT',
        dataType: 'integer',
        min: 0,
        max: 100,
        selected: false,
    },
];

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
    data: new Array(10).fill(fakeData),
    admin: {
        isEditTag: false,
        action: undefined,
        tag: {
            id: undefined,
            type: undefined,
            value: undefined,
            dataType: undefined,
            max: undefined,
            min: undefined,
            selected: false,
        },
    },
    filter: {
        category: fakeCategory,
        statInfo: fakeStatInfo,
        year: yearArr,
    },
};

const studyReducer = (state = initState, action) => {
    switch (action.type) {
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
                        value: undefined,
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
            const { type, tag } = action.payload;

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
