export default (function () {
    return {
        id: -1,
        pageMap: {
            1: {
                // page - step
                0: { value: '留下更多資訊給學弟妹吧!', type: 'label' },
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
                // page - step
                0: { value: '選擇你要分享的統計資料', type: 'label' },
                1: {
                    0: {
                        // stat - id
                        value: {
                            1: {
                                id: 1, // stat - id
                                title: '學年平均',
                            },
                            2: {
                                id: 2, // stat - id
                                title: '上學期平均',
                            },
                            3: {
                                id: 3, // stat - id
                                title: '下學期平均',
                            },
                            4: {
                                id: 4, // stat - id
                                title: 'TOELF',
                            },
                            5: {
                                id: 5, // stat - id
                                title: 'GPA',
                            },
                            6: {
                                id: 6, // stat - id
                                title: 'IELTS',
                            },
                            7: {
                                id: 7, // stat - id
                                title: '+ 其他類別',
                            },
                        },
                        width: '100%',
                        type: 'toggle_button_group',
                    },
                    2: {
                        // stat - id
                        value: '',
                        type: 'input',
                        elementAttrs: {
                            type: 'number',
                            min: 1,
                            max: 200,
                        },
                        keyName: 'rank_1',
                        type: 'number',
                        wording: 'TOFEL',
                        display: 'false',
                    },
                    3: {
                        // stat - id
                        value: '',
                        type: 'input',
                        elementAttrs: {
                            type: 'number',
                            min: 1,
                            max: 200,
                        },
                        keyName: 'rank_1',
                        type: 'number',
                        wording: '學年成績',
                    },
                    type: 'input_group',
                },
                2: {
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
