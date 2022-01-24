import React, { useEffect, useReducer } from 'react';
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

function reducer(state, action) {
    switch (action.type) {
        case 'PC':
            return 36;
        case 'mobile':
            return 21;
        default:
            return state;
    }
}

/**
 * This might be modified after backend implement API
 * @param {Object} param
 * @param {Array} param.data
 */
function TransCard({ data, index, style }) {
    const itemData = data[index];
    const [wordsNumber, dispatch] = useReducer(reducer, 36);
    const windowWidth = useWindowWidth();
    const handleOpenContent = useOpenContent(itemData, index);

    useEffect(() => {
        if (windowWidth >= 870 && wordsNumber === 21) {
            dispatch({ type: 'PC' });
        } else if (windowWidth < 870 && wordsNumber === 36) {
            dispatch({ type: 'mobile' });
        }
    }, [windowWidth]);

    return (
        <Card isConfirmed={itemData['confirm'] === 'true'} style={style}>
            <CardContent>
                <BadgeList>
                    {(Array.isArray(itemData['category'])
                        ? itemData['category']
                        : ['海外交換', '行政']
                    ).map((item, index) => (
                        <StatisticBadge key={index} value={item} />
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
                ).map((item, index) => (
                    <TagSpan key={index}>{'#' + item}</TagSpan>
                ))}
            </TagSpanList>
            <ShowBtn onClick={handleOpenContent}></ShowBtn>
        </Card>
    );
}

export default TransCard;
