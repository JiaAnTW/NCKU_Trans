import cloneDeep from 'lodash/cloneDeep';

function mapToCustomizeFunction(type) {
    switch (type) {
        case 'spawn_other':
            return (state, instance) => {
                const stateNext = state;
                const { type, step } = stateNext;
                const preSpawn = cloneDeep(instance);
                preSpawn.wording += instance.counter;
                stateNext.form[type].pageMap[step / 2][2][instance.counter++] =
                    preSpawn;
            };
        case 'onChange_other':
            return (state, index, value) => {
                const stateNext = state;
                const { type, step } = stateNext;
                stateNext.form[type].pageMap[step / 2][2][index].value = value;
            };
        default:
            return undefined;
    }
}
export default (function () {
    return {
        id: -1,
        confirm: false,
        pageMap: {
            1: {
                0: {
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
            },
            2: {
                // page - step
                0: {
                    0: { value: '選擇你要分享的統計資料', type: 'label' },
                },
                1: {
                    selectedStatistic: 0,
                    0: {
                        // stat - id
                        value: {
                            1: {
                                id: 1, // stat - id
                                title: '學年平均',
                                value: false,
                                instance: {
                                    // stat - id
                                    value: '',
                                    elementAttrs: {
                                        type: 'number',
                                        min: 0,
                                        max: 100,
                                    },
                                    keyName: 'score',
                                    type: 'input',
                                    wording: '學年平均',
                                },
                            },
                            2: {
                                id: 2, // stat - id
                                title: '上學期平均',
                                value: false,
                                instance: {
                                    // stat - id
                                    value: '',
                                    elementAttrs: {
                                        type: 'number',
                                        min: 0,
                                        max: 100,
                                    },
                                    keyName: 'score1',
                                    type: 'input',
                                    wording: '上學期平均',
                                },
                            },
                            3: {
                                id: 3, // stat - id
                                title: '下學期平均',
                                value: false,
                                instance: {
                                    // stat - id
                                    value: '',
                                    elementAttrs: {
                                        type: 'number',
                                        min: 0,
                                        max: 100,
                                    },
                                    keyName: 'score2',
                                    type: 'input',
                                    wording: '下學期平均',
                                },
                            },
                            4: {
                                id: 4, // stat - id
                                title: 'TOELF',
                                value: false,
                                instance: {
                                    // stat - id
                                    value: '',
                                    elementAttrs: {
                                        type: 'number',
                                        min: 0,
                                        max: 100,
                                    },
                                    keyName: 'toelf',
                                    type: 'input',
                                    wording: 'TOELF',
                                },
                            },
                            5: {
                                id: 5, // stat - id
                                title: 'GPA',
                                value: false,
                                instance: {
                                    // stat - id
                                    value: '',
                                    elementAttrs: {
                                        type: 'number',
                                        min: 0,
                                        max: 100,
                                    },
                                    keyName: 'gpa',
                                    type: 'input',
                                    wording: 'GPA',
                                },
                            },
                            6: {
                                id: 6, // stat - id
                                title: 'IELTS',
                                value: false,
                                instance: {
                                    // stat - id
                                    value: '',
                                    elementAttrs: {
                                        type: 'number',
                                        min: 0,
                                        max: 100,
                                    },
                                    keyName: 'ielts',
                                    type: 'input',
                                    wording: 'IELTS',
                                },
                            },
                            7: {
                                id: 7, // stat - id
                                title: '+ 其他類別',
                                customHandleClick:
                                    mapToCustomizeFunction('spawn_other'),
                                instance: {
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
                                        mapToCustomizeFunction(
                                            'onChange_other'
                                        ),
                                },
                            },
                        },
                        width: '100%',
                        type: 'toggle_button_group',
                    },
                    alertWord: {
                        value: '*目前沒有選擇任何統計資料項目',
                        type: 'label',
                        color: 'black',
                        align: 'left',
                    },
                },
                2: {}, //only for other statistic
                3: {
                    0: {
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
        },
    };
})();
