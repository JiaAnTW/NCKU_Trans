/**
 * inGroup attribute
 *  it will control margin-bottom
 * (e.g. inGroup == true then margin-bottom is 0 else 40px)
 */
/**
 * index attribute
 */
/**
 *  it will control the order display(input)
 * it control order of this button control's input data
 */
/**
 *  parent attribute
 * it will combine the attribute to same parent(fixed format in datastruct)
 */
/**
 * specialWord attribute
 * it will show before the wording(only in toggle button)
 */
/**
 * preventDefaultToggle attribute
 * same like it name , it can let the toggle UI styled missing(always not selected)
 */

export const Selectors = {
    score: {
        value: '',
        keyName: 'score',
        type: 'toggle_button',
        elementAttrs: {
            type: 'number',
            min: 50,
            max: 100,
            step: 0.1,
        },
        wording: '學年平均',
        index: 6,
        inGroup: true,
        parent: ['selectedData'],
    },
    first_score: {
        value: '',
        keyName: 'first_score',
        type: 'toggle_button',
        elementAttrs: {
            type: 'number',
            min: 50,
            max: 100,
            step: 0.1,
        },
        wording: '上學期平均',
        index: 7,
        inGroup: true,
        parent: ['selectedData'],
    },
    second_score: {
        value: '',
        keyName: 'second_score',
        type: 'toggle_button',
        elementAttrs: {
            type: 'number',
            min: 50,
            max: 100,
            step: 0.1,
        },
        wording: '下學期平均',
        index: 8,
        inGroup: true,
        parent: ['selectedData'],
    },
    toefl: {
        value: '',
        keyName: 'toefl',
        type: 'toggle_button',
        elementAttrs: {
            type: 'number',
        },
        wording: 'TOEFL',
        index: 9,
        inGroup: true,
        parent: ['selectedData'],
    },
    gpa: {
        value: '',
        keyName: 'gpa',
        type: 'toggle_button',
        elementAttrs: {
            type: 'number',
        },
        wording: 'GPA',
        index: 10,
        inGroup: true,
        parent: ['selectedData'],
    },
    ielts: {
        value: '',
        keyName: 'ielts',
        type: 'toggle_button',
        elementAttrs: {
            type: 'number',
        },
        wording: 'IELTS',
        index: 11,
        inGroup: true,
        parent: ['selectedData'],
    },
    other: {
        value: {
            keyValue: {
                value: '',
                keyName: 'keyValue',
                type: 'input',
                wording: '這個項目應該叫什麼名稱? (e.g: 總平均)',
                parent: ['other'],
            },
            dataValue: {
                value: '',
                keyName: 'dataValue',
                type: 'input',
                wording: '在這個項目你想分享的數據 (e.g: 87.5)',
                inGroup: true,
                parent: ['other'],
            },
        },
        keyName: 'other',
        type: 'toggle_button',
        specialWord: '+ ',
        wording: '其他類別',
        index: 0,
        inGroup: true,
        preventDefaultToggle: true,
        parent: ['other'],
    },
};
