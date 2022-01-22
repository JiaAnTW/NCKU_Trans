import { Selectors } from './dataSelection';

export default (function () {
    return {
        id: -1,
        step: 0,
        minStep: 0,
        maxStep: 1,
        title: {
            0: '留下更多資訊給學弟妹吧!',
            1: '選擇你要分享的統計資料',
        },
        maj: {
            value: '中文系',
            keyName: 'maj',
            type: 'select',
            wording: '原主修科系',
            options: [],
            remark: '如不想透漏，可以只填學院或其他。',
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
        buttonArr: {
            value: Selectors,
            width: '100%',
            type: 'toggle_button_group',
        },
        anySelected: {
            value: '*目前沒有選擇任何統計資料項目',
            type: 'label',
            keyName: 'anySelected',
        },
        selectedData: {
            value: {},
            type: 'input_group',
        },
        other: {
            value: {},
            type: 'input_group',
            keyName: 'other',
            index: 0,
        },

        /** maybe can let serve decide what should be shown in this page */

        /** number here is the order of page,it control by the attribute step*/
        /** the index in the page is the order of display */
        0: {
            0: 'maj',
        },
        1: {
            // 1~ 3 reserved as other components
            4: 'buttonArr',
            5: 'anySelected',
            6: 'selectedData',
            7: 'other',
            10000: 'comment',
        },
    };
})();
