import { useEffect } from 'react';
import { useModalContext, useSetModalFlow } from '../../../utils/index';
import transIntoModalData from '@/utils/redux/components/modal/transIntoModalData';

function useCommentFlow({ majorData }) {
    const [{ index }, setModalContent] = useModalContext();
    const [setModalOnBefore, setModalOnNext] = useSetModalFlow();

    useEffect(() => {
        if (index !== 0)
            setModalOnBefore(() =>
                setModalContent(
                    transIntoModalData(majorData[index - 1], index - 1)
                )
            );
        else {
            setModalOnBefore(undefined);
        }
    }, [index, majorData, setModalContent, setModalOnBefore]);

    useEffect(() => {
        if (index + 1 !== majorData.length) {
            setModalOnNext(() =>
                setModalContent(
                    transIntoModalData(majorData[index + 1], index + 1)
                )
            );
        } else {
            setModalOnNext(undefined);
        }
    }, [index, majorData, setModalContent, setModalOnNext]);
}

export default useCommentFlow;
