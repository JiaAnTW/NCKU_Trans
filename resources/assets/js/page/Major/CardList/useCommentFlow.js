import { useEffect } from 'react';
import { useModalContext, useSetModalFlow } from '../../../utils/index';
import transIntoModalData from '~/utils/redux/components/modal/transIntoModalData';
import { changeHeaderInfo } from '~/utils/seo/header';
import trans from '~/utils/transition';
import wording from '~/wording/general';

function useCommentFlow({ majorData }) {
    const [{ index }, setModalContent] = useModalContext();
    const [setModalOnBefore, setModalOnNext] = useSetModalFlow();

    useEffect(() => {
        if (index !== 0)
            setModalOnBefore(() => {
                setModalContent(
                    transIntoModalData(majorData[index - 1], index - 1)
                );
                changeHeaderInfo(
                    trans(wording['header']['title'], {
                        schoolName: wording['schoolName'],
                        year: majorData[index - 1]['year'],
                        in_maj: majorData[index - 1]['in_maj'],
                        category: majorData[index - 1]['category'],
                        websiteTitleShort: wording['websiteTitleShort'],
                    }),
                    majorData[index - 1]['comment']
                );
            });
        else {
            setModalOnBefore(undefined);
        }
    }, [index, majorData, setModalContent, setModalOnBefore]);

    useEffect(() => {
        if (index + 1 !== majorData.length) {
            setModalOnNext(() => {
                setModalContent(
                    transIntoModalData(majorData[index + 1], index + 1)
                );
                changeHeaderInfo(
                    trans(wording['header']['title'], {
                        schoolName: wording['schoolName'],
                        year: majorData[index + 1]['year'],
                        in_maj: majorData[index + 1]['in_maj'],
                        category: majorData[index + 1]['category'],
                        websiteTitleShort: wording['websiteTitleShort'],
                    }),
                    majorData[index + 1]['comment']
                );
            });
        } else {
            setModalOnNext(undefined);
        }
    }, [index, majorData, setModalContent, setModalOnNext]);
}

export default useCommentFlow;
