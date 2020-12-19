import { useEffect } from 'react';
import { useModalContext, useSetModalFlow } from '../../../utils/index';

function useCommentFlow({ majorData }) {
    const [{ index }, setModalContent] = useModalContext();
    const [setModalOnBefore, setModalOnNext] = useSetModalFlow();

    useEffect(() => {
        if (index !== 0)
            setModalOnBefore(() =>
                setModalContent({
                    id: majorData[index - 1]['id'],
                    title: '轉:' + majorData[index - 1]['in_maj'],
                    content: majorData[index - 1]['comment'],
                    tags: [
                        {
                            type: '申請年度',
                            value: majorData[index - 1]['year'],
                        },
                        {
                            type: '排名',
                            value:
                                majorData[index - 1]['rank_1'] +
                                ' / ' +
                                majorData[index - 1]['rank_2'],
                        },
                        {
                            type: '學年分數',
                            value: majorData[index - 1]['score'],
                        },
                        {
                            type: '轉出科系',
                            value: majorData[index - 1]['out_maj'],
                        },
                    ],
                    index: index - 1,
                })
            );
        if (index + 1 !== majorData.length) {
            setModalOnNext(() =>
                setModalContent({
                    id: majorData[index + 1]['id'],
                    title: '轉:' + majorData[index + 1]['in_maj'],
                    content: majorData[index + 1]['comment'],
                    tags: [
                        {
                            type: '申請年度',
                            value: majorData[index + 1]['year'],
                        },
                        {
                            type: '排名',
                            value:
                                majorData[index + 1]['rank_1'] +
                                ' / ' +
                                majorData[index + 1]['rank_2'],
                        },
                        {
                            type: '學年分數',
                            value: majorData[index + 1]['score'],
                        },
                        {
                            type: '轉出科系',
                            value: majorData[index + 1]['out_maj'],
                        },
                    ],
                    index: index + 1,
                })
            );
        }
    }, [index, majorData, setModalOnBefore, setModalOnNext]);
}

export default useCommentFlow;
