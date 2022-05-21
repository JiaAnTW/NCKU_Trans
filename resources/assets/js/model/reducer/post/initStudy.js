import getYearOption from './function/getYearOption';
import { mapToCustomizeFunction } from './mapToCustomFunction';

export default (function () {
    const { latestYear, yearOption } = getYearOption;
    return {
        id: -1,
        confirm: false,
        pageMap: {
            temporaryHandle: {
                //only for handle preview error
                keyName: 'category',
                value: [],
            },
            1: {
                0: {
                    // page - step
                    0: {
                        value: '留下更多資訊給學弟妹吧!',
                        type: 'label',
                    },
                    1: {
                        value: '',
                        keyName: 'title',
                        type: 'input',
                        wording: '心得標題',
                    },
                    2: {
                        value: '中文系',
                        keyName: 'major',
                        type: 'select',
                        wording: '原主修科系',
                        options: [],
                        remark: '如不想透漏，可以只填學院或其他。',
                    },
                    3: {
                        value: latestYear,
                        type: 'select',
                        keyName: 'year',
                        wording: '年份',
                        options: yearOption,
                    },
                },
            },
            2: {
                // page - step
                0: {
                    0: {
                        formType: 'study',
                        previewTarget: 'title',
                        placeHolder: '你未填寫心得標題',
                        type: 'preview_input',
                    },
                    1: { value: '選擇你要分享的統計資料', type: 'label' },
                    2: {
                        type: 'search_bar',
                        value: '',
                        customHandleChange:
                            mapToCustomizeFunction('searchingAlgorithm'),
                    },
                },
                1: {
                    selectedStatistic: 0,
                    0: {
                        // stat - id
                        value: {
                            999999: {
                                id: 999999, // stat - id
                                title: '+ 其他類別',
                                customHandleClick:
                                    mapToCustomizeFunction('spawn_other'),
                                instance: {
                                    counter: 1,
                                    value: { name: '', value: '' },
                                    keyName: 'other',
                                    type: 'pair_input',
                                    wording: '其他選項 - ',
                                    subWording: {
                                        0: '這個項目應該叫什麼名稱? (e.g: 總平均)',
                                        1: '在這個項目你想分享的數據 (e.g: 87.5)',
                                    },
                                    remark: '其他項目將會由管理員決定是否列為正式項目，不會大幅改動數據，但可能會就格式上進行修改、調整。',
                                    confirm: false,
                                },
                            },
                            controller: 'search_bar',
                        },
                        ignore: [],
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
                        keyName: 'content',
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
