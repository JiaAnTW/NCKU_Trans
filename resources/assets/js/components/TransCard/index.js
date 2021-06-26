import React, { useState, useEffect, useCallback } from 'react';
import {
    Card,
    CardContent,
    CardTitle,
    CardSubTitle,
    CardText,
    ShowBtn,
    TypeIcon,
    ContentInfo,
    TagSpan,
    YearSpan,
    TagSpanList,
} from './style';

import { useModalOpen, useModalContext } from '@/utils/index';
import { useWindowWidth } from '@/utils/index';
import transIntoModalData from '@/utils/redux/components/modal/transIntoModalData';

const contentMiddleware = (content, maxNumber) =>
    content.length < maxNumber
        ? content
        : content.substr(0, maxNumber - 1) + '  (...)';

function TransCard({ itemData, index }) {
    const [wordsNumber, setWordsNumber] = useState(27);
    const [, setIsModalOpen] = useModalOpen();
    const [, setModalContext] = useModalContext();

    const windowWidth = useWindowWidth();

    const handleOpenContent = useCallback(() => {
        setModalContext(transIntoModalData(itemData, index));
        setIsModalOpen(true);
    }, [itemData, setIsModalOpen, index]);

    useEffect(() => {
        if (windowWidth >= 870 && wordsNumber === 15) {
            setWordsNumber(27);
        } else if (windowWidth < 870 && wordsNumber === 27) {
            setWordsNumber(15);
        }
    }, [windowWidth, wordsNumber]);

    return (
        <Card dark={itemData['confirm'] === 'false'}>
            <CardContent>
                {itemData['category'] && (
                    <TypeIcon theme={itemData['category']}>
                        {itemData['category'][0]}
                    </TypeIcon>
                )}
                <ContentInfo>
                    <CardTitle>{itemData['in_maj']}</CardTitle>
                    <CardSubTitle>
                        {`原主修 ${itemData['out_maj']}`}
                    </CardSubTitle>
                    <CardText>
                        {contentMiddleware(itemData['comment'], wordsNumber)}
                    </CardText>
                </ContentInfo>
                <YearSpan theme={itemData['category']}>
                    {itemData['year']}
                </YearSpan>
                <TagSpanList>
                    <TagSpan theme={itemData['category']}>
                        {itemData['department']}
                    </TagSpan>
                </TagSpanList>
                <ShowBtn onClick={handleOpenContent}></ShowBtn>
            </CardContent>
        </Card>
    );
}

export default TransCard;
