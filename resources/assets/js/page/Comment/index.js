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
import MobileDepartmentFilterPresenter from './presenters/MobileDepartmentFilterPresenter';
import MobileYearFilterPresenter from './presenters/MobileYearFilterPresenter';
import Content from '../../components/Content/index';
import Statistic from './component/Statistic/index';
import useInitData from './utils/useInitData';

import '../../css/comment.css';

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
                {/* <YearFilterPresenter />
                <DepartmentFilterPresenter /> */}
                <div
                    className="MobileMenu"
                    style={{
                        display: 'block',
                    }}
                >
                    <MobileDepartmentFilterPresenter />
                    <MobileYearFilterPresenter />
                </div>
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
