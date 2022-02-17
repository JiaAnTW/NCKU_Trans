import {
    INIT_STUDY,
    START_EDIT_TAG,
    STOP_EDIT_TAG,
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
