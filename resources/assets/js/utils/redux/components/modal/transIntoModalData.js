function transIntoModalData(majorDataItem, index) {
    return {
        id: majorDataItem['id'],
        type: majorDataItem['category'],
        title: '' + majorDataItem['in_maj'],
        subtitle: `原主修: ${majorDataItem['out_maj']}`,
        content: majorDataItem['comment'],
        tags: [
            {
                type: '申請年度',
                value: majorDataItem['year'],
            },
            {
                type: '學年分數',
                value: majorDataItem['score'],
            },
            {
                type: '申請結果',
                value: '通過',
            },
            {
                type: '排名(上/下)',
                value:
                    majorDataItem['rank_1'] + ' / ' + majorDataItem['rank_2'],
            },
        ],
        index: index,
        confirm: majorDataItem['confirm'],
    };
}

export default transIntoModalData;
