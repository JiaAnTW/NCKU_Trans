function mapToCustomizeRemark(type) {
    switch (type) {
        default:
            return '請先清除輸入的資料，確認後再移除此項目';
    }
}
function mapToCustomizeFunction(type) {
    switch (type) {
        default:
            return (state, index, value) => {
                const stateNext = state;
                const { type, step } = stateNext;
                stateNext.form[type].pageMap[step / 2][1][index].value = value;
            };
    }
}
export default (function () {
    return {
        id: -1,
        confirm: false,
        pageMap: {
            1: {
                dictionary: { title: 0, maj: 1 },
                // page - step
                0: {
                    value: '留下更多資訊給學弟妹吧!',
                    keyName: 'title',
                    type: 'label',
                },
                1: {
                    value: '中文系',
                    keyName: 'maj',
                    type: 'select',
                    wording: '原主修科系',
                    options: [],
                    remark: '如不想透漏，可以只填學院或其他。',
                },
            },
            2: {
                dictionary: { title: 0, comment: 2 },
                // page - step
                0: { value: '選擇你要分享的統計資料', type: 'label' },
                1: {
                    0: {
                        // stat - id
                        value: {
                            1: {
                                id: 1, // stat - id
                                title: '學年平均',
                                value: false,
                            },
                            2: {
                                id: 2, // stat - id
                                title: '上學期平均',
                                value: false,
                            },
                            3: {
                                id: 3, // stat - id
                                title: '下學期平均',
                                value: false,
                            },
                            4: {
                                id: 4, // stat - id
                                title: 'TOELF',
                                value: false,
                            },
                            5: {
                                id: 5, // stat - id
                                title: 'GPA',
                                value: false,
                            },
                            6: {
                                id: 6, // stat - id
                                title: 'IELTS',
                                value: false,
                            },
                            7: {
                                id: 7, // stat - id
                                title: '+ 其他類別',
                                instantiate: {
                                    counter: 1,
                                    value: { title: '', value: '' },
                                    keyName: 'other',
                                    type: 'pair_input',
                                    wording: '其他選項 - ',
                                    subWording: {
                                        0: '這個項目應該叫什麼名稱? (e.g: 總平均)',
                                        1: '在這個項目你想分享的數據 (e.g: 87.5)',
                                    },
                                    remark: '其他項目將會由管理員決定是否列為正式項目，不會大幅改動數據，但可能會就格式上進行修改、調整。',
                                    confirm: false,
                                    customHandleChange:
                                        mapToCustomizeFunction(),
                                },
                            },
                        },
                        width: '100%',
                        type: 'toggle_button_group',
                    },
                    1: {
                        // stat - id
                        value: '',
                        elementAttrs: {
                            type: 'number',
                            min: 0,
                            max: 100,
                        },
                        keyName: 'score',
                        type: 'number',
                        wording: '學年平均',
                        anyValue: mapToCustomizeRemark(),
                        customHandleChange: mapToCustomizeFunction(),
                    },
                    2: {
                        // stat - id
                        value: '',
                        elementAttrs: {
                            type: 'number',
                            min: 0,
                            max: 100,
                        },
                        keyName: 'score1',
                        type: 'number',
                        wording: '上學期平均',
                        anyValue: mapToCustomizeRemark(),
                        customHandleChange: mapToCustomizeFunction(),
                    },
                    3: {
                        // stat - id
                        value: '',
                        elementAttrs: {
                            type: 'number',
                            min: 0,
                            max: 100,
                        },
                        keyName: 'score2',
                        type: 'number',
                        wording: '下學期平均',
                        anyValue: mapToCustomizeRemark(),
                        customHandleChange: mapToCustomizeFunction(),
                    },
                    4: {
                        // stat - id
                        value: '',
                        elementAttrs: {
                            type: 'number',
                            min: 0,
                            max: 100,
                        },
                        keyName: 'toelf',
                        type: 'number',
                        wording: 'TOELF',
                        anyValue: mapToCustomizeRemark(),
                        customHandleChange: mapToCustomizeFunction(),
                    },
                    5: {
                        // stat - id
                        value: '',
                        elementAttrs: {
                            type: 'number',
                            min: 0,
                            max: 100,
                        },
                        keyName: 'gpa',
                        type: 'number',
                        wording: 'GPA',
                        anyValue: mapToCustomizeRemark(),
                        customHandleChange: mapToCustomizeFunction(),
                    },
                    6: {
                        // stat - id
                        value: '',
                        elementAttrs: {
                            type: 'number',
                            min: 0,
                            max: 100,
                        },
                        keyName: 'ielts',
                        type: 'number',
                        wording: 'IELTS',
                        anyValue: mapToCustomizeRemark(),
                        customHandleChange: mapToCustomizeFunction(),
                    },
                    type: 'toggle_spawn_input',
                },
                2: {
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
            },
        },
    };
})();
