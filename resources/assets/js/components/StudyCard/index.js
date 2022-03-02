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
function StudyCard({ data, index, style }) {
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
        <Card isConfirmed={itemData['confirm']} style={style}>
            <CardContent>
                <BadgeList>
                    {itemData['category'].map((itemObj) => (
                        <StatisticBadge
                            key={itemObj['id']}
                            value={itemObj['name']}
                        />
                    ))}
                </BadgeList>
                <CardTitle>{itemData['title']}</CardTitle>
                <CardText>
                    {contentMiddleware(itemData['content'], wordsNumber)}
                </CardText>
            </CardContent>
            <TagSpanList>
                {itemData['statistic'].map((itemObj) => (
                    <TagSpan key={itemObj['id']}>
                        {'#' + itemObj['name']}
                    </TagSpan>
                ))}
            </TagSpanList>
            <ShowBtn onClick={handleOpenContent}></ShowBtn>
        </Card>
    );
}

export default StudyCard;
