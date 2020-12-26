import { INIT_POST_OPTION, SET_POST_FORM } from '../action/post';

const initState = {
    step: 0, //1 is index, 2~4 is comment , 5~6 is QA ,7 is loading
    form: {
        qa: {
            id: -1,
            question: '',
            answer: '',
        },
        comment: {
            id: -1,
            rank_1: {
                value: '',
                type: 'input',
                elementAttrs: {
                    type: 'number',
                    min: 1,
                    max: 200,
                },
                keyName: 'rank_1',
                type: 'number',
                wording: '排名上',
                min: 1,
                max: 200,
            },
            rank_2: {
                value: '',
                type: 'input',
                elementAttrs: {
                    type: 'number',
                    min: 1,
                    max: 200,
                },
                keyName: 'rank_2',
                wording: '排名下',
            },
            year: {
                value: 107,
                type: 'select',
                keyName: 'year',
                wording: '申請年度',
            },
            score: {
                value: '',
                keyName: 'score',
                type: 'input',
                elementAttrs: {
                    type: 'number',
                    min: 1,
                    max: 200,
                },
                wording: '學年分數',
                min: 1,
                max: 200,
            },
            out_maj: {
                value: '中文系',
                keyName: 'out_maj',
                type: 'select',
                wording: '轉出科系',
            },
            in_maj: {
                value: '中文系',
                keyName: 'in_maj',
                type: 'select',
                wording: '轉入科系',
            },
            comment: {
                value: '',
                keyName: 'comment',
                type: 'textarea',
                wording: '心得',
            },
        },
    },
    type: 'comment',
    start: false,
};

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_POST_OPTION: {
            const stateNext = state;

            // 初始化年度
            const yearOption = [];
            const clock = new Date();
            let latestYear = clock.getFullYear() - 1911;
            if (clock.getMonth() < 7) latestYear--;
            for (let i = 0; i < 5; ++i) {
                const yearItem = latestYear - i;
                yearOption.push({ value: yearItem, text: yearItem });
            }

            const year = {
                ...state.form.comment.year,
                options: yearOption,
                value: latestYear,
            };
            stateNext.form.comment.year = year;

            // 初始化學系
            const options = action.payload.departmentArr.map((department) => ({
                value: department.name,
                text: department.name,
            }));
            const out_maj = { ...state.form.comment.out_maj, options };
            const in_maj = { ...state.form.comment.in_maj, options };

            stateNext.form.comment.in_maj = in_maj;
            stateNext.form.comment.out_maj = out_maj;

            return stateNext;
        }
        case SET_POST_FORM: {
            const stateNext = state;
            const { keyName, value } = action.payload;
            stateNext.form[stateNext.type][keyName].value = value;
            return stateNext;
        }
        default:
            return state;
    }
};

export default postReducer;
