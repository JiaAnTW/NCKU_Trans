import React, { useEffect, useReducer } from 'react';
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

import { useWindowWidth } from '~/utils/index';

import useOpenContent from './useOpenContent';

const contentMiddleware = (content, maxNumber) =>
    content.length < maxNumber
        ? content
        : content.substr(0, maxNumber - 1) + '  (...)';

function reducer(state, action) {
    switch (action.type) {
        case 'PC':
            return 27;
        case 'mobile':
            return 15;
        default:
            return state;
    }
}

function TransCard({ itemData, index }) {
    const [wordsNumber, dispatch] = useReducer(reducer, 27);
    const windowWidth = useWindowWidth();
    const handleOpenContent = useOpenContent(itemData, index);

    useEffect(() => {
        if (windowWidth >= 870) {
            dispatch({ type: 'PC' });
        } else if (windowWidth < 870) {
            dispatch({ type: 'mobile' });
        }
    }, [windowWidth]);

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
