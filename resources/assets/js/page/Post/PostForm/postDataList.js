export const previewDataList = {
    comment: {
        title: 'in_maj',
        subtitle: 'out_maj',
        type: 'category',
        content: 'comment',
    },
    study: {
        title: 'title',
        content: 'content',
        category: 'category',
    },
};

export const postDataList = {
    comment: {
        rank_1: 'rank_1',
        rank_2: 'rank_2',
        year: 'year',
        score: 'score',
        out_maj: 'out_maj',
        in_maj: 'in_maj',
        comment: 'comment',
        isPass: 'isPass',
        category: 'category',
    },
    study: {
        /** IsForceTransToArr
         * - force change object which has the key to array
         * - if object already in array type will auto ignore
         * */
        isForceTransToArr: new Set(['other']),

        /** ProjectKeys
         * - change keyName to the expected value data will be pack in base layer
         * - able handle dynamic input(means will leave empty array if doesn't match key of input)
         */
        projectKeys: {
            other: 'otherStatistic',
        },

        /** SettingKeys
         * - data will be pack in base layer
         * - must fixed input can't be dynamic input
         */
        settingKeys: ['title', 'content', 'category', 'maj', 'year'],

        /** Statistic
         * - statistic decided by which obj has keyName attribute
         * - didn't in settingKeys and projectKeys
         * - array type in base layer call "statistic"
         * */
    },
};
