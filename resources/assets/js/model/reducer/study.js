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

const initState = {
    data: new Array(10).fill(fakeData),
};

const studyReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default studyReducer;
