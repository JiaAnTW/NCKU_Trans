import { useEffect } from 'react';
import { useModalContext, useSetModalFlow } from '../../../utils/index';

function useQAFlow({ QAData }) {
    const [{ index }, setModalContent] = useModalContext();
    const [setModalOnBefore, setModalOnNext] = useSetModalFlow();

    useEffect(() => {
        if (index !== 0)
            setModalOnBefore(() =>
                setModalContent({
                    id: QAData[index - 1]['id'],
                    title: QAData[index - 1]['question'],
                    content: QAData[index - 1]['answer'],
                    tags: [],
                    index: index - 1,
                })
            );
        if (index + 1 !== QAData.length) {
            setModalOnNext(() =>
                setModalContent({
                    id: QAData[index + 1]['id'],
                    title: QAData[index + 1]['question'],
                    content: QAData[index + 1]['answer'],
                    tags: [],
                    index: index + 1,
                })
            );
        }
    }, [index, QAData, setModalOnBefore, setModalOnNext]);
}

export default useQAFlow;
