import React from 'react';

import {
    LoadingContainer,
    GeneralContainer,
    MenuContainer,
    MultCards,
} from '../../css/generalStyle';

import { CommentSection, StatisticContainer } from './style';

import DepartmentFilterPresenter from './presenters/DepartmentFilterPresenter';
import YearFilterPresenter from './presenters/YearFilterPresenter';

import Icon from '../../components/icon';
import CommentCardsIndex from './presenters/CommentCardsIndex';
import Content from '../../components/Content/index';
import useInitData from './utils/useInitData';

function Comment() {
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
                <YearFilterPresenter />
                <DepartmentFilterPresenter />
            </MenuContainer>
            <CommentSection>
                <StatisticContainer>這裡放統計元件</StatisticContainer>
                <MultCards>
                    <CommentCardsIndex />
                </MultCards>
                <Content />
            </CommentSection>
        </GeneralContainer>
    );
}

export default Comment;
