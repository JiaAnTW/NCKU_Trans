import React, { useState, useEffect, useMemo } from 'react';
import {
    Card,
    CardContent,
    CardTitle,
    CardText,
    ShowBtn,
    TagSpan,
    TagSpanList,
    BadgeList,
    StatisticBadge,
} from './style';

import { useWindowWidth } from '~/utils/index';

import useOpenContent from './useOpenContent';

const contentMiddleware = (content, maxNumber) =>
    content.length < maxNumber
        ? content
        : content.substr(0, maxNumber - 1) + '  (...)';

/**
 * This might be modified after backend implement API
 * @param {Object} param
 * @param {Array} param.data
 */
function TransCard({ data, index, style }) {
    const itemData = data[index];
    const [wordsNumber, setWordsNumber] = useState(36);
    const windowWidth = useWindowWidth();
    const handleOpenContent = useOpenContent(itemData, index);

    useEffect(() => {
        if (windowWidth >= 870 && wordsNumber === 21) {
            setWordsNumber(36);
        } else if (windowWidth < 870 && wordsNumber === 36) {
            setWordsNumber(21);
        }
    }, [windowWidth, wordsNumber]);

    return (
        <Card isConfirmed={itemData['confirm'] === 'true'} style={style}>
            <CardContent>
                <BadgeList>
                    {(Array.isArray(itemData['category'])
                        ? itemData['category']
                        : ['海外交換', '行政']
                    ).map((item) => (
                        <StatisticBadge value={item} />
                    ))}
                </BadgeList>
                <CardTitle>
                    {itemData['title'] || "標題, it's title placeholder here."}
                </CardTitle>
                <CardText>
                    {contentMiddleware(
                        itemData['content'] || itemData['comment'],
                        wordsNumber
                    )}
                </CardText>
            </CardContent>
            <TagSpanList>
                {(Array.isArray(itemData['statistic'])
                    ? itemData['statistic']
                    : ['109', 'TOFEL', 'GPA']
                ).map((item) => (
                    <TagSpan>{'#' + item}</TagSpan>
                ))}
            </TagSpanList>
            <ShowBtn onClick={handleOpenContent}></ShowBtn>
        </Card>
    );
}

export default TransCard;
