export default (function () {
    return {
        id: -1,
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
        p0: {
            maj: {},
        },
        p1: {},
        other: {},
    };
})();
