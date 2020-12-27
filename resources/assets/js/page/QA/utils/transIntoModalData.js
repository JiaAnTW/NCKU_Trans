function transIntoModalData(QADataItem, index) {
    return {
        id: QADataItem['id'],
        title: QADataItem['question'],
        content: QADataItem['answer'],
        tags: [],
        index: index,
        confirm: QADataItem['confirm'],
    };
}

export default transIntoModalData;
