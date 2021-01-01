function transIntoModalData(majorDataItem, index) {
    return {
        id: majorDataItem['id'],
        title: '轉:' + majorDataItem['in_maj'],
        content: majorDataItem['comment'],
        tags: [
            {
                type: '申請年度',
                value: majorDataItem['year'],
            },
            {
                type: '排名',
                value:
                    majorDataItem['rank_1'] + ' / ' + majorDataItem['rank_2'],
            },
            {
                type: '學年分數',
                value: majorDataItem['score'],
            },
            {
                type: '轉出科系',
                value: majorDataItem['out_maj'],
            },
        ],
        index: index,
        confirm: majorDataItem['confirm'],
    };
}

export default transIntoModalData;
