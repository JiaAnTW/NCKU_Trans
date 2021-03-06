import React from 'react';

import {
    LoadingContainer,
    GeneralContainer,
    MenuContainer,
    MultCards,
} from '../../css/generalStyle';

import { CommentSection, StatisticContainer } from './style';

import Fliter from './Filter/index';

import Icon from '../../components/icon';
import CommentCardsIndex from './CommentIndex/CommentCardsIndex';
import Content from '../../components/Content/index';
import Statistic from './Statistic/index';
import useInitData from './useInitData';

import '../../css/comment.css';

function Comment({ isAdmin }) {
    const isFinishRequest = useInitData();

    //---------------資料尚未取得---------------
    if (!isFinishRequest) {
        return (
            <LoadingContainer>
                <Icon style={{ marginTop: '0' }} />
            </LoadingContainer>
        );
    }
    //---------------一般狀況---------------
    return (
        <GeneralContainer>
            <MenuContainer>
                <Fliter />
            </MenuContainer>
            <CommentSection>
                <StatisticContainer>
                    <Statistic />
                </StatisticContainer>
                <MultCards>
                    <CommentCardsIndex />
                </MultCards>
                <Content isAdmin={isAdmin} />
            </CommentSection>
        </GeneralContainer>
    );
}

export default Comment;
