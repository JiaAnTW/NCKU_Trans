import { useEffect } from 'react';
import { useModalContext, useSetModalFlow } from '../../../utils/index';
import transIntoModalData from './transIntoModalData';

function useQAFlow({ QAData }) {
    const [{ index }, setModalContent] = useModalContext();
    const [setModalOnBefore, setModalOnNext] = useSetModalFlow();

    useEffect(() => {
        if (index !== 0)
            setModalOnBefore(() =>
                setModalContent(
                    transIntoModalData(QAData[index - 1], index - 1)
                )
            );
        else {
            setModalOnBefore(undefined);
        }
    }, [index, QAData, setModalContent, setModalOnBefore]);

    useEffect(() => {
        if (index + 1 !== QAData.length) {
            setModalOnNext(() =>
                setModalContent(
                    transIntoModalData(QAData[index + 1], index + 1)
                )
            );
        } else {
            setModalOnNext(undefined);
        }
    }, [index, QAData, setModalContent, setModalOnNext]);
}

export default useQAFlow;
