export default {
    id: -1,
    year: {
        value: 107,
        type: 'select',
        keyName: 'year',
        wording: '申請年度',
    },
    category: {
        value: '轉系',
        type: 'select',
        keyName: 'category',
        wording: '申請類別',
        options: [
            { value: '轉系', text: '轉系' },
            { value: '輔系', text: '輔系' },
            { value: '雙主修', text: '雙主修' },
        ],
    },
    out_maj: {
        value: '中文系',
        keyName: 'out_maj',
        type: 'select',
        wording: '原主修科系',
    },
    in_maj: {
        value: '中文系',
        keyName: 'in_maj',
        type: 'select',
        wording: '目標申請科系',
    },
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
    score: {
        value: '',
        keyName: 'score',
        type: 'input',
        elementAttrs: {
            type: 'number',
            min: 50,
            max: 100,
            step: 0.1,
        },
        wording: '學年分數',
    },
    isPass: {
        value: true,
        type: 'select',
        keyName: 'isPass',
        wording: '申請結果',
        options: [
            { value: true, text: '通過' },
            { value: false, text: '未通過' },
        ],
    },
    comment: {
        value: '',
        keyName: 'comment',
        type: 'textarea',
        wording: '心得',
        width: 2,
        elementAttrs: {
            style: {
                marginTop: '20px',
            },
        },
    },
};
