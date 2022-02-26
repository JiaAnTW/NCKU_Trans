function transIntoModalData(type, itemData, index) {
    function parseTimestamp(timestamp) {
        return /\d{4}-\d{2}-\d{2}/.exec(timestamp)[0];
    }

    switch (type) {
        case 'study':
            return {
                id: itemData['id'],
                title: itemData['title'],
                postTime: `109(未回傳，固定)（發文時間：${parseTimestamp(
                    itemData['timestamp']
                )}）`,
                statistic: itemData['statistic'],
                category: itemData['category'],
                content: itemData['content'],
                confirm: itemData['confirm'],
                index: index,
                rawData: itemData,
            };
        case 'trans':
            return {
                id: itemData['id'],
                type: itemData['category'],
                title: '' + itemData['in_maj'],
                subtitle: `原主修: ${itemData['out_maj']}`,
                content: itemData['comment'],
                tags: [
                    {
                        type: '申請年度',
                        value: itemData['year'],
                    },
                    {
                        type: '學年分數',
                        value: itemData['score'],
                    },
                    {
                        type: '申請結果',
                        value: itemData['isPass'],
                    },
                    {
                        type: '排名(上/下)',
                        value: itemData['rank_1'] + ' / ' + itemData['rank_2'],
                    },
                ],
                index: index,
                confirm: itemData['confirm'],
                rawData: itemData,
            };
        default:
            return {
                rawData: itemData,
            };
    }
}

export default transIntoModalData;
